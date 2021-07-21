//this file is for our tests and the tests for the client per component (these are mock tests) they are not implemented
//Enzyme or in another test library (React testing library) at the moment 


//procedure subunit components aka "core components" (Form, input, pagination, tableHeader, tableBody, protectedRoute)
//test the props a functional component receives
//HTML DOM element type .toBe('button')
//childProps passed to component from HOC .prop('nane').toBe();
//passes other props (onClick, className, altAltributes) .prop('name').toBe(type)


//procedure to test composite components aka "higherOrder components" (LoginForm, RegisterForm, moviesForm, navbar, moviesTable, logout, newHotel, sellerDashBoard, stripeCallBack, connectNav, dashbaordNav, CarouselSlide)
//types of composite components .childAt().toBe('type'); 
//tests the inside of HTML markup of styled component
//test that the styled component is the correct type, recieves the appropriate styles
//.toHaveStyleRule('width', '100%);
//.toHaveStyleRule('height', 'value') for a passed prop style
//test state of a class based component
//.toEqual({}) 
//.setState on component and assert .toEqual 
//tests embedded component setsProps accordingly

//SmallCard component
//testing pyramid
