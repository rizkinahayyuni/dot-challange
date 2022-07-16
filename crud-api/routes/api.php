<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use App\Models\Comments;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/create-student', [StudentController::class, 'createStudent']);
Route::get('/students', [StudentController::class, 'studentsListing']);
Route::get('/student/{id}', [StudentController::class, 'createStudent']);
Route::delete('/student/{id}', [StudentController::class, 'studentDelete']);

Route::post('/create-comment', [CommentController::class, 'createComment']);
Route::get('/comments', [CommentController::class, 'commentsListing']);
Route::get('/comment/{id}', [CommentController::class, 'createComment']);
Route::delete('/comment/{id}', [CommentController::class, 'commentDelete']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/signup", [UserController::class, 'userSignUp']);
Route::post("/login", [UserController::class, 'userLogin']);
Route::get("/user/{email}", [UserController::class, 'userDetail']);
