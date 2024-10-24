const Footer = () => {
  return (
    <footer className="bg-gray-800 p-6 text-white">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.facebook.com" className="hover:text-blue-500" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
          <a href="https://www.twitter.com" className="hover:text-blue-400" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
          <a href="https://www.instagram.com" className="hover:text-pink-600" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="https://www.linkedin.com" className="hover:text-blue-700" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
        </div>
        <p>&copy; 2024 Kanga Store. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

