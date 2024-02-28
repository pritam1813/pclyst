import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Link,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faSquareInstagram,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Author = () => {
  const techUsed = [
    { name: "Next JS", link: "https://nextjs.org/" },
    { name: "Tailwind CSS", link: "https://tailwindcss.com/" },
    { name: "Next UI", link: "https://nextui.org/" },
    { name: "Hygraph", link: "https://hygraph.com/" },
  ];

  const socials = [
    { link: "https://www.facebook.com/Pritam1813/", icon: faFacebook },
    { link: "https://twitter.com/pritam1813", icon: faSquareXTwitter },
    { link: "https://instagram.com/pritamd1813", icon: faSquareInstagram },
    { link: "https://www.linkedin.com/in/pritam1813/", icon: faLinkedin },
  ];
  return (
    <main className="container mx-auto px-5">
      <h1 className="text-center text-4xl">Author</h1>
      <Card className="mx-auto my-8 py-4 w-[80%] md:w-[70%] lg:w-[55%]">
        <CardHeader className="justify-center flex-col">
          <Avatar
            src="https://media.graphassets.com/hhtFCOr7S6CZc7MiEH0n"
            className="w-20 h-20 text-large"
          />
          <h2 className="my-3 text-2xl">Pritam Dhara</h2>
        </CardHeader>
        <CardBody className="justify-center text-center">
          <p>
            Hello! I’m an ardent Full Stack Developer and the mind behind the
            Pclyst blog. This blog was created using{" "}
            {techUsed.map((tech, index) => (
              <span key={index}>
                {index == techUsed.length - 1 ? "and " : ""}
                <Link href={tech.link} isExternal showAnchorIcon>
                  {tech.name}
                </Link>
                {index < techUsed.length - 2 ? ", " : ""}
              </span>
            ))}
            . Pclyst is a dedicated platform that brings you the latest news and
            reviews about Laptops, Desktops, and Accessories. While our current
            focus lies in these areas, we’re excited to announce that we’ll be
            expanding our content to cover a wider range of topics very soon.
            Stay tuned!.
          </p>
        </CardBody>
        <CardFooter className="justify-center text-center flex-col">
          <div className="my-3 text-xl">Follow Me</div>
          <div className="flex gap-3">
            {socials.map((social, index) => (
              <Link
                href={social.link}
                key={index}
                isExternal
                color="foreground"
              >
                <FontAwesomeIcon icon={social.icon} className="w-6" />
              </Link>
            ))}
          </div>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Author;
