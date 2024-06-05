import Image from 'next/image';

const persons = [
  {
    name: 'Saalim Aqueel',
    role: 'Fullstack developer',
    avatar:
      'https://avatars.githubusercontent.com/u/98530202?s=400&u=066a7b7ebd92563f376acb1c0c722784db58a279&v=4',
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/in/saalim-aqueel/',
  },
  {
    name: 'Faizan Raza',
    role: 'Frontend developer',
    avatar: 'https://avatars.githubusercontent.com/u/143700173?v=4',
    github: 'https://github.com/faizanr27',
    linkedin: 'https://www.linkedin.com/in/faizan-raza-3b3a22203/',
  },
  {
    name: 'Soumyajit Bhattacharya',
    role: 'Product designer, half developer',
    avatar: 'https://avatars.githubusercontent.com/u/146617888?v=4',
    github: 'https://github.com/Mochi0010',
    linkedin: 'https://www.linkedin.com/in/',
  },
];

const PersonCard = ({ children }: { children: React.ReactNode }) => (
  <div className="transition ease-in-out delay-100 duration-300 px-6 py-8 flex flex-col items-center text-center shadow hover:shadow-xl rounded-xl border-2 border-resume-50 hover:border-resume-100">
    {children}
  </div>
);

const ProfileSocial = ({ github, linkedin }: { github: string; linkedin: string }) => (
  <div className="flex gap-4">
    <a href={github} target="_blank" rel="noreferrer">
      <Image src="/icons/github.svg" alt="github" width="24" height="24" />
    </a>
    <a href={linkedin} target="_blank" rel="noreferrer">
      <Image src="/icons/linkedin.svg" alt="linkedin" width="24" height="24" />
    </a>
  </div>
);

export default function Person() {
  return (
    <>
      {persons.map((person) => (
        <PersonCard key={person.name}>
          <Image
            src={person.avatar}
            alt={person.name}
            className="rounded-full"
            height="96"
            width="96"
          />
          <p className="text-resume-800 mt-4 font-bold">{person.name}</p>
          <p className="text-resume-400 mb-6">{person.role}</p>
          <ProfileSocial github={person.github} linkedin={person.linkedin} />
        </PersonCard>
      ))}
    </>
  );
}
