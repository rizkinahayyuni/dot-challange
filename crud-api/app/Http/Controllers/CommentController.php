<?php

namespace App\Http\Controllers;

use App\Models\Comments;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    private $status = 200;
    // --------------- [ Save Student function ] -------------
    public function createComment(Request $request)
    {
        // validate inputs
        $validator = Validator::make(
            $request->all(),
            [
                "user_id" => "required",
                "comment" => "required",
            ]
        );
        // if validation fails
        if ($validator->fails()) {
            return response()->json([
                "status" => "failed",
                "validation_errors" => $validator->errors()
            ]);
        }
        $comment_id = $request->id;
        $commentArray = array(
            "user_id" => $request->user_id,
            "comment" => $request->comment,
        );
        if ($comment_id != "") {
            $student = Comments::find($comment_id);
            if (!is_null($student)) {
                $updated_status = Comments::where(
                    "id",
                    $comment_id
                )->update($commentArray);
                if ($updated_status == 1) {
                    return response()->json([
                        "status" => $this->status,
                        "success" => true, "message" => "comment detail updated successfully"
                    ]);
                } else {
                    return response()->json([
                        "status" => "failed",
                        "message" => "Whoops! failed to update, try again."
                    ]);
                }
            }
        } else {
            $comment = Comments::create($commentArray);
            if (!is_null($comment)) {
                return response()->json([
                    "status" => $this->status,
                    "success" => true, "message" => "comment record created successfully",
                    "data" => $comment
                ]);
            } else {
                return response()->json(["status" => "failed", "success" =>
                false, "message" => "Whoops! failed to create."]);
            }
        }
    }
    // --------------- [ comment Listing ] -------------------
    public function commentsListing()
    {
        $comment = Comments::all();
        if (count($comment) > 0) {
            return response()->json(["status" => $this->status, "success"
            => true, "count" => count($comment), "data" => $comment]);
        } else {
            return response()->json(["status" => "failed", "success" =>
            false, "message" => "Data Not Found"]);
        }
    }
    // --------------- [ comment Detail ] ----------------
    public function commentDetail($id)
    {
        $comment = Comments::find($id);
        if (!is_null($comment)) {
            return response()->json(["status" => $this->status, "success"
            => true, "data" => $comment]);
        } else {
            return response()->json(["status" => "failed", "success" =>
            false, "message" => "Whoops! no student found"]);
        }
    }
    //---------------- [ Delete comment ] ----------
    public function commentDelete($id)
    {
        $comment = Comments::find($id);
        if (!is_null($comment)) {
            $delete_status = Comments::where("id", $id)->delete();
            if ($delete_status == 1) {
                return response()->json([
                    "status" => $this->status,
                    "success" => true, "message" => "student record deleted successfully"
                ]);
            } else {
                return response()->json(["status" => "failed", "message" =>
                "failed to delete, please try again"]);
            }
        } else {
            return response()->json(["status" => "failed", "message" =>
            "Whoops! no student found with this id"]);
        }
    }
}
