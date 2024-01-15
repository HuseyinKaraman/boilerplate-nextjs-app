"use client";
import "./globals.css";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import {Component} from 'react';

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" />
            </head>
            <SessionProvider>
                <body>
                    <ToastContainer />
                    <Header />
                    {children}
                </body>
            </SessionProvider>
        </html>
    );
}
