<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api/clients/'], function () use ($router) {
    $router->get('', 'ClientController@index');
    $router->post('', 'ClientController@create');
    $router->post('lookup', 'ClientController@lookup');
    $router->get('details/{id}', 'ClientController@show');
    $router->put('edit/{id}', 'ClientController@update');
    $router->patch('edit/{id}', 'ClientController@update');
    $router->delete('delete/{id}', 'ClientController@delete');
    $router->get('expire', 'ClientController@toBeExpired');
});
