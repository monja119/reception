<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'path',
        'conteneur_numero',
        'conteneur_id',
        'creator_id',
        'index',
        'extension',
    ];

    public function conteneur()
    {
        return $this->belongsTo(Conteneur::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class);
    }


}
