<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conteneur extends Model
{
    use HasFactory;

    protected $table = 'dbo.conteneurs';

    protected $fillable =[
        'numero',
        'quantity',
        'reste',
        'creator_id'
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'creator_id');
    }
}
