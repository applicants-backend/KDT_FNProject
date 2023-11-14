import {useState} from 'react'
import axios, { Axios, AxiosResponse } from 'axios'
import styled from 'styled-components'

interface LoginResponse {
    
}

interface LoginCredentials {
    userId : string;
    password : string;
}

const LoginContainer = styled.div `
width: 500px;
height: 500px;

`

  
export default function Login() {

    return
            <>
                <div className='LoginContainer'>

                </div>
            </>
}