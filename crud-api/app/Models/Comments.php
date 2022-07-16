<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Comments extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id','comment'
    ];
   static function get_ll()
   {
       $return=DB::table('comments')
       ->join('students','comments.user_id','=','students.id');
       return $return;
   }
}
