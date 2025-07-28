const Footer = () => {
  return (
        <footer className="bg-[#f8fdfa] py-10 text-center text-gray-600 text-sm border-t stick-bottom">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">FAQ</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="flex justify-center gap-4 text-lg mb-2">
          <a href="#"><i className="ri-twitter-fill" /></a>
          <a href="#"><i className="ri-instagram-fill" /></a>
          <a href="#"><i className="ri-facebook-fill" /></a>
        </div>
        <p>@2025 Trendify. All rights reserved.</p>
      </footer>
  )
}
export default Footer