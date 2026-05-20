# Clients Management App — Architecture

Tech stack: React 17 · Redux Toolkit · React Router DOM v5 · Axios · Semantic UI React · Laravel Lumen · MySQL

---

## Application Flow Chart

```mermaid
flowchart TD
    Start([Browser loads /]) --> Provider["<Provider store>\nInjects Redux store into React tree"]
    Provider --> App[App / index.js\nRouter + ErrorBoundary]

    App --> RouteHome["/ → Home\n(navigation hub)"]
    App --> RouteLookup["/lookup → Lookup\n(search form)"]
    App --> RouteAdd["/add → Add\n(create client form)"]
    App --> RouteList["/list → List\n(lookup results table)"]
    App --> RouteDetails["/details/:id → Details\n(single client view)"]
    App --> RouteExpire["/expire → ToBeExpired\n(expiring memberships)"]

    RouteLookup -->|"dispatch(fetchClients(fields))"| ThunkFetch["createAsyncThunk\nfetchClients"]
    ThunkFetch -->|POST /api/clients/lookup| API[(Lumen API\nMySQL)]
    API -->|"200 JSON array"| ThunkFetch
    ThunkFetch -->|"fulfilled → payload"| LookupReducer["lookupReducer\nstate.lookup.lookupResults"]
    LookupReducer -->|"dispatch(lookupClientsSuccess)"| RouteList

    RouteAdd -->|"dispatch(createClient(data))"| ThunkCreate["createClient thunk\n(Add/actions.js)"]
    ThunkCreate -->|POST /api/clients| API
    API -->|"201 JSON client"| ThunkCreate
    ThunkCreate -->|"dispatch(addClientSuccess)"| AddReducer["addReducer\nstate.add.clientAdded = true"]
    AddReducer -->|Redirect| RouteList

    RouteList -->|"handleRemove(id)"| ListReducer["listReducer (local)\nREMOVE_ITEM"]
    RouteDetails -->|PUT/PATCH /api/clients/edit/:id| API
```

---

## Redux State Data Model

```mermaid
classDiagram
    class ReduxStore {
        +clients: ClientsSliceState
        +lookup: LookupState
        +list: ListState
        +add: AddState
    }

    class ClientsSliceState {
        +clients: Client[]
        +loading: boolean
        +error: string | null
    }

    class LookupState {
        +lookupFields: LookupFields
        +lookupResults: Client[] | null
        +lookupLoading: boolean
        +lookupError: string | null
        +lookupErrors: string[]
    }

    class LookupFields {
        +firstName: string
        +lastName: string
        +phoneNumber: string
    }

    class ListState {
        +clients: Client[] | null
    }

    class AddState {
        +clients: Client[]
        +clientAdded: boolean
        +addError: Error | null
    }

    class Client {
        +id: number
        +first_name: string
        +last_name: string
        +phone_number: string
        +address: string
        +mailing_address: string
        +membership_type: string
        +membership_expiry_date: date
    }

    ReduxStore *-- ClientsSliceState
    ReduxStore *-- LookupState
    ReduxStore *-- ListState
    ReduxStore *-- AddState
    LookupState *-- LookupFields
    ClientsSliceState "1" o-- "many" Client
    LookupState "1" o-- "many" Client
    AddState "1" o-- "many" Client
```

---

## API Endpoints (Lumen Backend)

```mermaid
flowchart LR
    subgraph "GET"
        G1[GET /api/clients/] --> idx[ClientController@index\nReturn all clients]
        G2[GET /api/clients/details/:id] --> show[ClientController@show\nReturn one client]
        G3[GET /api/clients/expire] --> exp[ClientController@toBeExpired\nExpiring in 30 days]
    end
    subgraph "POST"
        P1[POST /api/clients/] --> create[ClientController@create\nValidate + INSERT]
        P2[POST /api/clients/lookup] --> lookup[ClientController@lookup\nSearch by name/phone]
    end
    subgraph "PUT/PATCH/DELETE"
        U1["PUT|PATCH /api/clients/edit/:id"] --> update[ClientController@update\nUpdate fields]
        D1[DELETE /api/clients/delete/:id] --> del[ClientController@delete\nSoft/hard delete]
    end
```

---

## Action / Reducer Flow

```mermaid
sequenceDiagram
    participant UI as React Component
    participant Dispatch as dispatch()
    participant Thunk as Thunk Middleware
    participant API as Lumen REST API
    participant Reducer as Reducer
    participant Store as Redux Store
    participant Re as Re-render

    Note over UI,Re: Lookup Flow
    UI->>Dispatch: dispatch(fetchClients(fields))
    Dispatch->>Thunk: intercepts (async thunk)
    Thunk->>Reducer: dispatch pending → loading=true
    Thunk->>API: POST /api/clients/lookup
    API-->>Thunk: 200 [ ...clients ]
    Thunk->>Reducer: dispatch fulfilled → clients array
    Reducer->>Store: state.clients.clients = payload
    Dispatch->>Reducer: dispatch(lookupClientsSuccess(payload))
    Reducer->>Store: state.lookup.lookupResults = payload
    Store->>Re: useSelector triggers re-render in List

    Note over UI,Re: Add Client Flow
    UI->>Dispatch: dispatch(createClient(data))
    Dispatch->>Thunk: intercepts (createClient thunk)
    Thunk->>API: POST /api/clients
    API-->>Thunk: 201 { ...newClient }
    Thunk->>Reducer: dispatch(addClientSuccess(client))
    Reducer->>Store: state.add.clientAdded = true
    Store->>Re: Add component reads clientAdded → Redirect to /list
```
