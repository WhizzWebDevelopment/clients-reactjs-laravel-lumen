<?php
declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Client.
 */
class Client extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'phone_number',
        'membership_type',
        'membership_expiry_date',
        'address',
        'mailing_address'
    ];

    /**
     * The table clients is associated with the model.
     *
     * @var string
     */
    protected $table = 'clients';

    /**
     * The connection name for the model same as .env.
     *
     * @var string
     */
    protected $connection = 'mysql';
}
