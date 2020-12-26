import React from "react";

const DocsIcon = ({ className, size, ...props }) => (
  <img className={className} 
       src="https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png"
       height={size}
       width={size}
       {...props}
  />
);

export default DocsIcon;
