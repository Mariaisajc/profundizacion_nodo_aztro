import invariant from "tiny-invariant"
import { ActionFunctionArgs, json, redirect, type LoaderFunctionArgs } from "@remix-run/node"; 
import { getContact, updateContact} from "../data";
import { Form, useLoaderData } from "@remix-run/react";


export const loader = async ({ params }: LoaderFunctionArgs) => {
    invariant(params.contactId, "Missing contactId parameter")

    const contact= await getContact (params.contactId);

    if (!contact) {
        throw new Response ("Not found" , { status: 404 });
    }

    return json ({ contact });
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
    invariant (request.method === "POST", "Mhetod not allowed");
    invariant (params.contactId, "Missing contactId parameter");

    const formData=await request.formData();
    const firstName= formData.get("first") as string;
    const lastName= formData.get("last") as string;


    const update= Object.fromEntries(formData);

    await updateContact(params.contactId, update);

    return redirect(`/contacts/${params.contactId}`, {status: 303});

}

export default function EditContact() {
    const {contact} = useLoaderData<typeof loader>();

        return (
            <Form key={contact.id} method="post" id="contact-form">
                <p>
                    <span>Name</span>
                    <input type="text" 
                    name="first" 
                    defaultValue={contact.first}
                    placeholder="First"
                    aria-label="First Name" />

                    <input type="text" 
                    name="last" 
                    defaultValue={contact.last}
                    placeholder="Last"
                    aria-label="Last Name" />
                </p>
                <label>
                    <span>Twitter</span>
                    <input type="text" 
                    name="twitter" 
                    defaultValue={contact.twitter}
                    placeholder="@twitter"
                    aria-label="Twitter" />
                </label>

                <label>
                    <span>Avatar</span>
                    <input 
                    type="text"
                    name="avatar" 
                    defaultValue={contact.avatar}
                    placeholder="https://example.com/avatar.jpg"
                    aria-label="Avatar URL" />
                </label>

                <label>
                    <span>Notes</span>
                    <textarea
                    name="notes"
                    defaultValue={contact.notes}
                    rows={6}/>
                </label>

                <p>
                    <button type="submit">Save</button>
                    <button type="button">Cancel</button>
                </p>

            </Form>
        );
    }