const proxy_server_url= 'https://young-island-58664.herokuapp.com/'
const url= proxy_server_url+ 'EC2Co-EcsEl-IOMSFA68GT8U-758619912.us-east-1.elb.amazonaws.com:99';
const url_book= proxy_server_url+ 'EC2Co-EcsEl-IOMSFA68GT8U-758619912.us-east-1.elb.amazonaws.com:3300';
const url_user= proxy_server_url+ 'EC2Co-EcsEl-IOMSFA68GT8U-758619912.us-east-1.elb.amazonaws.com:5000';
const Url= {
    home_url: '',
    login_url: url + '/auth/login',
    signup_url: url_user + '/user/signup',
    refreshToken_url: url+ '/auth/refreshToken',
    book_url: url_book + '/books/all',
    add_book: url_book + '/books/addBook',
    book_by_ID: url_book + '/books/byID'
};
export default Url;
