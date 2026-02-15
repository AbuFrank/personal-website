const siteName = process.env.NEXT_PUBLIC_SITE_NAME

const Footer = () => {
  return (
    <div className="my-12 text-center text-gray-600">
      <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
    </div>
  )
}

export default Footer