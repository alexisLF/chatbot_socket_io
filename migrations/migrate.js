require('dotenv').config();
const mongoose = require('mongoose');
const mConf = require('../models/conference')

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => {

    const confs = [
        new mConf({
            title: 'Mixing Content, Commerce, and SEO with Headless WordPress',
            description: 'When working with Headless WordPress it can be daunting having to setup an e-commerce site. This workshop will take you through connecting a Shopify app with your WordPress site, linking your WordPress content to your Shopify products, building a React and NextJS frontend to show your products and posts, using Yoast SEO, and deploying your site to WP Engine’s Atlas platform.  Format: exposition, code-along with Q&A'
        }, 
        ), new mConf({
            title: 'Incrementally Adopt Modern React Patterns in a Legacy Codebase',
            description: 'In this workshop, we’ll look at some of the approaches and techniques that can be applied when making refactors or adding new features to a legacy React codebase to bring it inline with the latest approaches. We’ll cover topics such as how to use React Hooks to share component logic in a way that will allow reuse in class components; how to incrementally introduce other patterns to a React Redux app; and how to build in flexible UI components via abstractions where we are tied to some global CSS or a component library. Along the way, we’ll touch on many React patterns and state management approaches with the ultimate aim of being able to evaluate these options and let our requirements drive the architecture in moving towards a more robust and maintainable codebase.' 
        }), new mConf({
            title: 'Landing Your Next Developer Job',
    description: "Renaud Bressant (Head of Product), Nathanael Lamellière (Head of Customer Success and Solution Engineer), Nouha Chhih (Developer Experience Manager) will be looking at the different developer jobs that you can accounter when looking for your next developer role. We'll be explaining the specifics of each role, to help you identify which one could be your next move. We'll also be sharing tips to help you navigate the recruitment process, based on the different roles we interviewed for as recruiters, but also as candidates. This will be more of an Ask Us Anything session, so don't hesitate to share your thoughts and questions during the session."
        }), new mConf({
            title: 'Hybrid Cloud Development with Next.js, AWS, and Tailwind',
    description: "In this workshop you'll learn how to build highly scalable cloud APIs with AWS and integrate them with Next.js and style them using Tailwind CSS.  We'll build out a multi-user blogging platform, implementing a database with DynamoDB, authentication with Amazon Cognito, and a GraphQL API with AWS AppSync and connect to the app from the Next.js client using AWS Amplify. Users will be able to edit and delete their own posts as well as add rich media like cover images using Amazon S3."
        }), new mConf({
            title: 'Intermediate Gatsby Workshop',
    description: 'With Gatsby v3 out and freshly released, learn how to build modern, performant and accessible by default websites from one of the maintainers of the project, Sid Chatterjee. The main topics for this workshop will include:'
        }), new mConf({
            title: 'Advanced React / Advanced Composition Workshop',
    description: "Are you ready to take your React development to the next level? In this workshop we'll cover some of React's more advanced topics including advanced useEffect, hooks composition, imperative React, using mutable refs, and how to build highly reusable abstractions. We'll build out various parts of a project along the way with exercises for you to get hands with the material."
        }), new mConf({
            title: 'Advanced, Fancy TypeScript',
            description: "More and more projects are using TypeScript. This workshop will provide a deep dive into the language, and basic TypeScript knowledge is assumed. We will briefly discuss the design philosophy of TypeScript, and then cover all the lesser-known or harder features. That is: do all the cool and weird meta programming stuff (TS is turing complete!) and learn the tricks you won't find in the handbook."
        }), new mConf({
            title: 'Design Systems in React',
    description: 'This is a hands-on workshop for React developers in which you will learn how to define a common language for collaboration and iterate on products faster.  We will start with the important questions of Why and When. While design systems encompass tools and processes for everyone in the company, we will focus on the code side of it - Platform agnostic design tokens and a component library in React that can be used in products and can evolve as teams use it.'
        })];


    const savePromises = confs.map(conf => {
        return new Promise((resolve, reject) => {
            conf.save((error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result);
            })
        })
    });
        
    mConf.deleteMany({}, () => {
        Promise.all(savePromises).then((results) => {
            console.log(results);
            console.log("Success")
            process.exit(1);
    }, (error) => {
            console.error(error);
            process.exit(1);
    })  
    })
})
.catch((err) => console.log(err));
