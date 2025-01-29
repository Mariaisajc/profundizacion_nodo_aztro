import { ActionFunction, json } from "@remix-run/node";
import { useActionData } from "@remix-run/react"; 

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const firstName= formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const address = formData.get("address");
    
    if (!firstName || !lastName || !email || !address) {
        return json({ message: "All fields are required" }, { status: 400 });
    }

    return json({ message: `Hello, ${firstName} ${lastName} your email is ${email}!` });

};

interface ActionData {
    message?: string;
    error?: Error;
}

export default function BasicForm() {
    const actionData = useActionData<ActionData>();

    return (
        <div>
            <h1>Basic Form</h1>
            <form method="post">
                <label>
                    First Name: <input type="text" name="firstName" />
                </label>
                <label>
                    Last Name: <input type="text" name="lastName" />
                </label>
                <label>
                    Email: <input type="text" name="email" />
                </label>
                <label>
                    Address: <input type="text" name="address" />
                </label>
                <button type="submit">Send</button>
            </form>
            {actionData?.message && <p>{actionData.message}</p>}
            {actionData?.error && <p style={{color:"red"}}>{actionData.error.message}</p>}
        </div>
    );
}