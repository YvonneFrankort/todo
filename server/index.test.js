import {expect} from "chai"
import express from "express"
import { initializeTestDb, insertTestUser, getToken } from './helper/test.js'


describe("Testing basic database functionality", () => {
    let token = null
    const testUser = { email: "foo@foo.com", password: "password123" } 

    before(() => {
        initializeTestDb()
        token = getToken(testUser)
    })
    
    it("should get all tasks", async () => {
        const response = await fetch("http://localhost:3001/")
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.be.an("array").that.is.not.empty
        expect(data[0]).to.include.all.keys(["id", "description"])
    })

    it("should create a new task", async() => {
        const newTask = {description: "Test task"}
        const response = await fetch("http://localhost:3001/create",{
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({task: newTask})
        })
        const data = await response.json()
        expect(response.status).to.equal(201)
        expect(data).to.include.all.keys(["id", "description"])
        expect(data.description).to.equal(newTask.description)   
    })
    
    it("should delete task", async() => {
        const response = await fetch("http://localhost:3001/delete/1",{
            method: "delete"
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.include.all.keys("id")
    })

    it("should not create a new task without description", async() => {
        const response = await fetch("http://localhost:3001/create",{
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({task: null})
        })
        const data = await response.json()
        expect(response.status).to.equal(400)
        expect(data).to.have.all.keys("error")
    })
})

describe("Testing user management", () => {
    const user = { email: "foo2@test.com", password: "password123" } 
    before(() => {
        insertTestUser(user)
    })

    it("should sign up", async() => {
        //const newUser = {email:"foo@test.com", password: "password123"} sign up tetst needs a new email every time
        const newUser = { email:`foo${Date.now()}@test.com`, password: "password123" }


        const response = await fetch("http://localhost:3001/user/signup",{
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({user: newUser})
        })
        const data = await response.json()
        expect(response.status).to.equal(201)
        expect(data).to.include.all.keys(["id", "email"])
    })

    it('should log in', async () => {
        const response = await fetch("http://localhost:3001/user/login", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user })
        })
        const data = await response.json()
        expect(response.status).to.equal(200)
        expect(data).to.include.all.keys(["id", "email", "token"])
        expect(data.email).to.equal(user.email)
    })
})
    


