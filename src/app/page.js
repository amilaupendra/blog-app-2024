'use client'

import { Amplify, Auth, API } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
import { withAuthenticator ,AmplifyTheme} from '@aws-amplify/ui-react';


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
    <>
    <Navbar></Navbar>
    <Page></Page>
    </>
  );
}


export default withAuthenticator(Home);