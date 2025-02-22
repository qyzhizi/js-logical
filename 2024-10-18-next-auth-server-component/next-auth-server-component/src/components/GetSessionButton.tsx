'use client'

import {getCsrfToken, getSession} from 'next-auth/react'

const SignInButton = () => {

    const logSession = async () => {
        console.log(await getSession())
    }

    return (
        <button type="button" onClick={() => logSession()}
                className="rounded-md  px-3.5 py-2.5 text-sm font-semibold shadow-sm ring-2 ring-inset ring-gray-300  hover:bg-blue-300">
            Log session
        </button>
    )
}

export default SignInButton