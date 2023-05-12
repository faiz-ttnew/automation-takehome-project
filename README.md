# automation-takehome-project

Project for candidates to complete as a hiring assessment.

## Instructions

1. Fork repo to your own project.
2. Send link to the forked repo by the provided due date.

## Project Requirements

The objective is to build an automation application that meets the following requirements:

1. Use Node.js, Typescript, and the [Playwright](https://playwright.dev/) library.
2. Navigate to https://amazon.com
3. Finds the three lowest prices for any given search term
4. Write these products' to a CSV locally where each row contains product, price, search term, and link to the product's page.
5. The design should be generalized enough so that the framework can be applied to another e-commerce site with relative ease and minimal re-work.
6. Should utilize Typescript features where helpful.
7. Should run successfully during the review session.
8. Focus on maintainability and scalability.

### Extra Credit

1. Introduce a set of tests around the project

## Project Run Instructions

- Install the dependencies
 ```npm install```
 ```npm install playwright@latest```
 ```npm install playwright```
 -  Run the application
 ```npm run dev```
 -  Run the playwright
 ```npx playwright test```
 -  To open last HTML report run
 ```npx playwright show-report```

- Open api test tool like ```postman``` or any other tool. In my case using ```postman```.
- call the API```localhost:2000/prod``` with the follwoing request body
```json
{
    "search_term":"dell laptop",
    "source":"amazon"
}
```
- Server will send response.
```json
{
    "search_term": "dell laptop",
    "source": "amazon",
    "data": [
        {
            "product": "DELL XPS L502X Laptop Screen 15.6 LED Bottom Left WXGA HD",
            "price": "$44.81",
            "link": "https://www.amazon.com/s?k=/DELL-L502X-Laptop-Screen-BOTTOM/dp/B00A41VGCQ/ref=sr_1_1?keywords=%3Ddell+laptop&qid=1683898965&sr=8-1",
            "search_term": "dell laptop"
        },
        {
            "product": "Dell Chromebook 11 3180 RH02N 11.6-Inch Traditional Laptop (Black)",
            "price": "$489.09",
            "link": "https://www.amazon.com/s?k=/Dell-Chromebook-RH02N-11-6-Inch-Traditional/dp/B06X9DT3SF/ref=sr_1_3?keywords=%3Ddell+laptop&qid=1683898965&sr=8-3",
            "search_term": "dell laptop"
        }
    ]
}
```
### Tech Stack
- ```nodejs```
- ```expresjs```
- ```typescript```
- used ```cheerio``` for scrapping the elements
- used ```axios``` for http request
