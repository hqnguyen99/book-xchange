const url= 'https://young-island-58664.herokuapp.com/EC2Co-EcsEl-U35388XWUFD-1599943944.us-east-1.elb.amazonaws.com:5000';
const Url= {
    home_url: '',
    login_url: url + '/auth/login',
    signup_url: url + '/user/signup',
    refreshToken_url: url+ '/auth/refreshToken',
    book_url: url + '/books/allBooks'
};
export default Url;
