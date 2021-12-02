const url= 'https://young-island-58664.herokuapp.com/EC2Co-EcsEl-IOMSFA68GT8U-758619912.us-east-1.elb.amazonaws.com:99';
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
