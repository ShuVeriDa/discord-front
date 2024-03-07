import React, {ReactNode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css'
import {ClerkProvider, RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {RootLayout} from "./layouts/RootLayout.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {CreateServerModal} from "./components/modals/CreateServerModal.tsx";
import {ApolloProvider} from "@apollo/client";
import client from "./apolloClient.ts";
import {ChannelLayout} from "./layouts/ChannelLayout.tsx";
import {CreateChannelModal} from "./components/modals/CreateChannelModal.tsx";
import {ChannelPage} from "./pages/ChannelPage.tsx";
import {ServerLayout} from "./layouts/ServerLayout.tsx";

const ProtectedRoute = ({children}: { children: ReactNode }) => {
  return <>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn/>
    </SignedOut>
  </>
}

const RouterComponent = () => {
  const navigate = useNavigate()

  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
                   navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path='' element={<RootLayout/>}>
          <Route index
                 element={
                   <ProtectedRoute>
                     <CreateServerModal/>
                     <HomePage/>
                   </ProtectedRoute>
                 }/>
        </Route>

        <Route path="servers/:serverId" element={<ServerLayout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <CreateChannelModal />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="servers/:serverId/channels/:channelType/:channelId"
               element={<ChannelLayout/>}
        >
          <Route index element={<ProtectedRoute>
            <CreateChannelModal/>
            <ChannelPage/>
          </ProtectedRoute>}
          />
        </Route>
      </Routes>
    </ClerkProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider>
        <BrowserRouter>
          <RouterComponent/>
        </BrowserRouter>
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>,
)

export default RouterComponent
