import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
    return (
        <div className="h-screen w-full flex justify-center items-center bg-neutral-900">
            <SignIn
                className="drop-shadow-md"
                path="/sign-in"
                routing="path"
            />
        </div>

    );
}

export default SignInPage;