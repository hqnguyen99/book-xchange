const url= 'http://api-gateway-371406776.us-east-1.elb.amazonaws.com:99';
const Url= {
    home_url: '',
    login_url: url + '/auth/login',
    signup_url: url + '/user/signup',
    refreshToken_url: url+ '/auth/refreshToken',
    book_url: url + '/books/allBooks',
    add_book: url + '/books/addBook',
    book_by_ID: url + '/books/byID'
};
export default Url;
