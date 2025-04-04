import React from 'react'
import { useSignIn } from '@clerk/clerk-react';
import { Button } from './ui/button';
const SignInOAuthButtons = () => {
    const { signIn, isLoaded } = useSignIn();
    if (!isLoaded) {
        return null;
    }

    const signinWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: `/sso-callback`,
            redirectUrlComplete: `/auth-callback`,

        })
    }
  return (
      <Button onClick={signinWithGoogle} variant={"secondary"} className='w-full text-white border-zinc-200 h-11'>
          Continue with Google
    </Button>
        
  )
}

export default SignInOAuthButtons