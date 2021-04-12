<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

/**
 * Class ClientController
 *
 * @package App\Http\Controllers
 */
class ClientController extends Controller
{
    private Client $client;
    
    public function __construct(Client $client)
    {
        $this->client = $client;
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        return response()->json(Client::all());
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array|\Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(Request $request)
    {
        $this->validate(
            $request,
            [
                'first_name' => 'required|alpha_dash|min:1',
                'last_name' => 'required|alpha_dash|min:1',
                'address' => 'required|min:1'
            ]
        );
        $client = $this->client->create($request->all());
    
        return response()->json($client, 201);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(int $id, Request $request): \Illuminate\Http\JsonResponse
    {
        $client = $this->client->find($id);
        if(!$client) {
            abort(404);
        }
        $client->update($request->all());
    
        return response()->json($client);
    }
    
    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id): \Illuminate\Http\JsonResponse
    {
        $client = $this->client->find($id);
        if(!$client) {
            abort(404);
        }
        
        return response()->json($client);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function delete(int $id): \Illuminate\Http\Response
    {
        $client = $this->client->find($id);
        if (!$client) {
            abort(404);
        }
        $client->delete();
    
        return response('Deleted Successfully');
    }
    
    /**
     * Find clients by user's input conditions.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function lookup(Request $request): \Illuminate\Http\JsonResponse
    {
        $criteria = [];
        $firstName = $request->input('firstName');
        if ($firstName) {
            $criteria[] = ['first_name', 'like', $firstName . '%'];
        }
    
        $lastName = $request->input('lastName');
        if ($lastName) {
            $criteria[] = ['last_name', 'like', $lastName . '%'];
        }
    
        $phone = $request->input('phoneNumber');
        if ($phone) {
            $criteria[] = ['phone_number', '=', $phone];
        }
    
        $clients = $this->client->where($criteria)->get();
        if(!$clients) {
            abort(204);
        }
    
        return response()->json($clients);
    }
    
    /**
     * Find client that will be expired in the next 30 days.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function toBeExpired(): \Illuminate\Http\JsonResponse
    {
        $today = new \DateTime('now');
        $from = $today->format('Y-m-d');
        $end = $today->add(new \DateInterval('P30D'))->format('Y-m-d');
        $clients = $this->client->whereBetween('membership_expiry_date', [$from, $end])->get();
        if(!$clients) {
            abort(204);
        }
        
        return response()->json($clients);
    }
}
