import invariant from "tiny-invariant"
import { ActionFunctionArgs, json, redirect} from "@remix-run/node"; 
import { deleteContact} from "../data";



export const action = async ({ params }: ActionFunctionArgs) => {
    
    invariant (params.contactId, "Missing contactId parameter");

    await deleteContact(params.contactId);

    return redirect("", {status: 303});

}
