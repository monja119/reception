<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class X3 extends Model
{
    use HasFactory;

    protected $connection = 'X3';

    protected $table = 'TALYSPROD.SHIPMENT';
}
