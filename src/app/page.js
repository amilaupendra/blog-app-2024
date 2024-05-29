'use client'

import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
import { withAuthenticator} from '@aws-amplify/ui-react';


import Page from "./pages/feedback/page";
import Navbar from '@/app/components/navbar/page'


Amplify.configure(awsExports);

// export default function Home({ signOut, user }) {
//   const handleSignOut = () => {
//     Auth.signOut();
//   };
//   return (
//     <>
//     <Navbar></Navbar>
    
//     <Page></Page>
//     </>
   
//   );
// }

function Home({ signOut, user }) {

  return (
    <div className="px-4 m-auto bg-white">
    <Navbar></Navbar>
    <Page></Page>
    </div>
  );
}


export default withAuthenticator(Home);