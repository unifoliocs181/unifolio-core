export const resumeTemplates = [
  {
    id: "ats",
    name: "ATS Modern",
    pdfUrl: "https://y3uiusoam7.ufs.sh/f/6TEVGovXFsmypafqOiB3V5wvkNZ9DYKd6jlhPCsMbXJERzU8",
	code:String.raw`\documentclass[letterpaper,10pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}
\input{glyphtounicode}

% Font options
\usepackage[sfdefault]{roboto}  % Sans-serif font

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}
\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Section formatting
\titleformat{\section}{\Large\bfseries\scshape\raggedright}{}{0em}{}[\titlerule]

% Ensure PDF is machine readable
\pdfgentounicode=1

% Custom commands
\newcommand{\resumeItem}[1]{\item\small{#1}}
\newcommand{\resumeSubheading}[4]{
\vspace{-1pt}\item
  \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
    \textbf{#1} & #2 \\
    \textit{#3} & \textit{#4} \\
  \end{tabular*}\vspace{-7pt}
}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}
\newcommand{\resumeSubHeadingList}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}

\begin{document}

\begin{center}
  \textbf{\Huge Alex Webb} \\
  \small 555-123-4567 $|$ \href{mailto:alex@email.com}{alex@email.com} $|$ 
  \href{https://linkedin.com/in/burhan-webb}{linkedin.com/in/alexwebbx} $|$
  \href{https://github.com/zwayth}{github.com/alexwebbx}
\end{center}

\section*{Summary}
Passionate AI/ML engineer with a strong background in deep learning, computer vision, and natural language processing. Skilled in Python, TensorFlow, PyTorch, and various ML libraries. Excellent problem-solving, research, and collaboration abilities. Seeking a challenging role to develop cutting-edge AI solutions.

\section{Technical Skills}
\resumeSubHeadingList
  \resumeItem{\textbf{Programming Languages}: Python, C++, SQL, MATLAB}
  \resumeItem{\textbf{Deep Learning Frameworks}: TensorFlow, PyTorch, Keras, Caffe}
  \resumeItem{\textbf{Libraries \& Tools}: NumPy, Pandas, Scikit-learn, OpenCV, NLTK, Git, Docker}
\resumeSubHeadingListEnd

\section{Projects}
\resumeSubHeadingList
  \resumeSubheading
      {Image Captioning System}{Jan 2023 -- Present}
      {Deep Learning Project}{Python, TensorFlow, OpenCV}
      \resumeSubHeadingList
          \resumeItem{\textbullet\ Developed an end-to-end system for generating descriptive captions for images}
          \resumeItem{\textbullet\ Utilized CNN and LSTM models for image feature extraction and caption generation}
          \resumeItem{\textbullet\ Achieved state-of-the-art performance on the COCO dataset}
      \resumeSubHeadingListEnd
  \resumeSubheading
      {Sentiment Analysis API}{Aug 2022 -- Dec 2022} 
      {Natural Language Processing}{Python, Flask, NLTK, Hugging Face}
      \resumeSubHeadingList
          \resumeItem{\textbullet\ Built a RESTful API for sentiment analysis of text data}
          \resumeItem{\textbullet\ Implemented pre-trained transformer models using Hugging Face}
          \resumeItem{\textbullet\ Deployed the API on a cloud platform for easy integration}
      \resumeSubHeadingListEnd
\resumeSubHeadingListEnd

\section{Experience}
\resumeSubHeadingList
  \resumeSubheading
      {AI Research Intern}{June 2022 -- Aug 2022}
      {DeepMind}{London, UK}
      \resumeSubHeadingList
          \resumeItem{\textbullet\ Conducted research on reinforcement learning algorithms for robotics}
          \resumeItem{\textbullet\ Implemented and evaluated deep RL models using PyTorch and RLlib}
          \resumeItem{\textbullet\ Presented findings at weekly research meetings}
      \resumeSubHeadingListEnd
  \resumeSubheading
      {Machine Learning Engineer}{Jan 2021 -- May 2022}
      {Acme AI Solutions}{San Francisco, CA}
      \resumeSubHeadingList
          \resumeItem{\textbullet\ Developed and deployed machine learning models for various industries}
          \resumeItem{\textbullet\ Optimized model performance and ensured data quality}
          \resumeItem{\textbullet\ Collaborated with cross-functional teams to deliver AI solutions}
      \resumeSubHeadingListEnd
\resumeSubHeadingListEnd

\section{Education}
\resumeSubHeadingList
  \resumeSubheading
      {Stanford University}{Stanford, CA}
      {M.S. in Computer Science, Artificial Intelligence}{Aug 2019 -- May 2021}
  \resumeSubheading
      {University of California, Berkeley}{Berkeley, CA}
      {B.S. in Electrical Engineering and Computer Science}{Aug 2015 -- May 2019}
\resumeSubHeadingListEnd

\section{Certifications}
\resumeSubHeadingList
  \resumeItem{\textbullet\ AWS Certified Machine Learning - Specialty}
  \resumeItem{\textbullet\ TensorFlow Developer Certificate}
\resumeSubHeadingListEnd

\end{document}`
  },
  {
    id: "academic",
    name: "Academic",
    pdfUrl: "https://y3uiusoam7.ufs.sh/f/6TEVGovXFsmyJRnEa851eo7CkSXODPyq8LAgtEzxlGhsu6ZR",
	code: String.raw`\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[colorlinks=true, linkcolor=blue, urlcolor=blue]{hyperref}
\usepackage{fancyhdr}
\usepackage{multirow}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Margins
\addtolength{\oddsidemargin}{-0.375in}
\addtolength{\evensidemargin}{-0.375in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-.5in}
\addtolength{\textheight}{1.0in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Section title formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Custom commands
\newcommand{\resumeItem}[2]{
  \item\small{
    \textbf{#1}{: #2 \vspace{-2pt}}
  }
}

\newcommand{\resumeItemNH}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-1pt}\item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-5pt}
}

\newcommand{\resumeSubItem}[2]{\resumeItem{#1}{#2}\vspace{-4pt}}

\renewcommand{\labelitemii}{$\circ$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=*,label={}]}
\newcommand{\resumeSubHeadingListStartBullets}{\begin{itemize}[leftmargin=*]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}}

%--------------------------------------------
%%%%%%% TEMPLATE RESUME STARTS %%%%%%%%%%%%%%
%--------------------------------------------

\begin{document}

%----------HEADER-----------------
\begin{center}
    {\LARGE \textbf{YOUR NAME HERE}} \\[-3pt]
    \small
    \href{mailto:your-email@example.com}{your-email@example.com} \textbar{}
    (000) 000-0000 \textbar{}
    \href{https://your-portfolio.com}{Portfolio} \textbar{}
    \href{https://github.com/username}{GitHub} \textbar{}
    \href{https://linkedin.com/in/your-profile}{LinkedIn} \textbar{}
    Citizenship / Work Authorization
\end{center}

%-----------EXPERIENCE-----------------
\section{Work Experience}
\resumeSubHeadingListStart

  \resumeSubheading
      {Company Name}{City, State}
      {Job Title}{Start Month YYYY -- Present}
      \resumeItemListStart
        \resumeItemNH{Your first accomplishment or responsibility.}
        \resumeItemNH{Your second accomplishment with measurable impact.}
        \resumeItemNH{Another responsibility describing tools, technologies, or impact.}
        \resumeItemNH{Optional additional bullet depending on role.}
      \resumeItemListEnd

  \resumeSubheading
      {Company Name}{City, State}
      {Job Title}{Start Month YYYY -- End Month YYYY}
      \resumeItemListStart
        \resumeItemNH{Describe what you did in this role.}
        \resumeItemNH{Describe teamwork, systems, or technologies used.}
      \resumeItemListEnd

\resumeSubHeadingListEnd

%-----------PROJECTS-----------------
\section{Projects}
\resumeSubHeadingListStartBullets

  \resumeSubItem{Project Name (Tech Stack)}
    {Short description of what the project does, the purpose, and key features.}

  \resumeSubItem{Project Name (Tech Stack)}
    {Describe a measurable impact or interesting technical challenge solved.}

  \resumeSubItem{Project Name (Tech Stack)}
    {Additional project details or unique achievement.}

\resumeSubHeadingListEnd

%-----------SKILLS-----------------
\section{Skills}
\resumeSubHeadingListStart
  \resumeSubItem{Languages}
    {Python, C++, TypeScript, JavaScript, etc.}
  \resumeSubItem{Technologies}
    {Linux, Git, Docker, PostgreSQL, AWS, React, Node.js, etc.}
\resumeSubHeadingListEnd

%-----------EDUCATION-----------------
\section{Education}
\resumeSubHeadingListStart

  \resumeSubheading
      {University Name}{City, State}
      {Degree Name}{Start Month YYYY -- End Month YYYY}
      \resumeItemListStart
        \resumeItem{Concentrations}{Your academic focus areas.}
        \resumeItem{Coursework}
          {Relevant courses you want highlighted.}
        \resumeSubItem{Awards}
          {Dean’s List, Scholarships, Honors, etc.}  
      \resumeItemListEnd

\resumeSubHeadingListEnd

%-----------AWARDS-----------------
\section{Certifications \& Awards}
\resumeSubHeadingListStartBullets

  \resumeSubItem{Certifications:}
    {Certification 1, Certification 2, Certification 3}

\resumeSubHeadingListEnd

%-------------------------------------
\end{document}

`
  },
  {
    id: "classic",
    name: "Professional Classic",
    pdfUrl: "https://y3uiusoam7.ufs.sh/f/6TEVGovXFsmySINBz681LAanzTSNOvociIPkdDsuGRBEhQ5b",
	code: String.raw`\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage[english]{babel}
\usepackage{tabularx}
\usepackage{fontawesome5}
\usepackage{multicol}
\usepackage{graphicx}%\setmainfont{Times New Roman}
\setlength{\multicolsep}{-3.0pt}
\setlength{\columnsep}{-1pt}
\input{glyphtounicode}

\RequirePackage{tikz}
\RequirePackage{xcolor}

\definecolor{cvblue}{HTML}{0E5484}
\definecolor{black}{HTML}{130810}
\definecolor{darkcolor}{HTML}{0F4539}
\definecolor{cvgreen}{HTML}{3BD80D}
\definecolor{taggreen}{HTML}{00E278}
\definecolor{SlateGrey}{HTML}{2E2E2E}
\definecolor{LightGrey}{HTML}{666666}
\colorlet{name}{black}
\colorlet{tagline}{darkcolor}
\colorlet{heading}{darkcolor}
\colorlet{headingrule}{cvblue}
\colorlet{accent}{darkcolor}
\colorlet{emphasis}{SlateGrey}
\colorlet{body}{LightGrey}

%----------FONT OPTIONS----------
% sans-serif
% \usepackage[sfdefault]{FiraSans}
% \usepackage[sfdefault]{roboto}
% \usepackage[sfdefault]{noto-sans}
% \usepackage[default]{sourcesanspro}

% \usepackage[T1]{fontenc}
% \usepackage[T1]{fontenc}
% \usepackage{cochineal}
% \usepackage{fourier}

% \usepackage{fontspec}
% \usepackage{polyglossia}
% \setmainlanguage{german}
% \setmainfont{Times New Roman}

% serif
\usepackage{CormorantGaramond}
\usepackage{charter}

% \pagestyle{fancy}
% \fancyhf{}  % clear all header and footer fields
% \fancyfoot{}
% \renewcommand{\headrulewidth}{0pt}
% \renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.6in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1.19in}
\addtolength{\topmargin}{-.7in}
\addtolength{\textheight}{1.4in}
\urlstyle{same}

\definecolor{airforceblue}{rgb}{0.36, 0.54, 0.66}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{-4pt}\scshape\raggedright\large\bfseries
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

% Ensure that generate pdf is machine readable/ATS parsable
\pdfgentounicode=1

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-1pt}}
  }
}

\newcommand{\classesList}[4]{
    \item\small{
        {#1 #2 #3 #4 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{\large#1} & \textbf{\small #2} \\
      \textit{\large#3} & \textit{\small #4} \\
      
    \end{tabular*}\vspace{-7pt}
}


\newcommand{\resumeSingleSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{\large#1} & \textbf{\small #2} \\
      
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubSubheading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \textit{\small#1} & \textit{\small #2} \\
    \end{tabular*}\vspace{-7pt}
}


\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{1.001\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & \textbf{\small #2}\\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

\renewcommand\labelitemi{$\vcenter{\hbox{\tiny$\bullet$}}$}
\renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}[leftmargin=0.1in]}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

\newcommand\sbullet[1][.5]{\mathbin{\vcenter{\hbox{\scalebox{#1}{$\bullet$}}}}}

%-------------------------------------------\usepackage{fontspec}
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%


\begin{document}
%----------HEADING----------


\begin{center}
    {\huge Full Name} \\ \vspace{2pt} 
    {+1 (xxx) xxx xxxx} ~ 
    \small{-}
    \href{[url to portfolio]}{\color{blue}{Portfolio}} ~ 
    \small{-}
    \href{mailto:[enter your email id]}{\color{blue}{xxxx@gmail.com}} ~ 
    \small{-}
    \href{[url to linkedin profile]}{ \color{blue}{linkedin.com/in/username}}  ~
    \small{-}
    \href{[url to github profile]}{ \color{blue}{github.com/username}} ~
    \vspace{-7pt}
\end{center}

%-----------EDUCATION-----------
\section{\color{airforceblue}EDUCATION}
  \resumeSubHeadingListStart
    \resumeSubheading
      {University 1}{Location, State, USA}
      {Degree and Specialization}{Month Year - Month Year}
    \vspace{-4pt}
     \resumeSubheading
      {University 2}{Location, State, USA}
      {Degree and Specialization}{Month Year - Month Year}
  \resumeSubHeadingListEnd
  \vspace{-10pt}

%-----------PROGRAMMING SKILLS-----------
\section{\color{airforceblue}TECHNICAL SKILLS}
 \begin{itemize}[leftmargin=0in, label={}]
    \small{\item{
     \textbf{\normalsize{Programming Languages:}}{ \normalsize{Python, C++}} \\
      \vspace{1.2pt}
      
     \textbf{\normalsize{Libraries and Tools:}}{ \normalsize{PyTorch,  Sklearn, Pandas, Numpy, OpenCV, Git, Docker}} \\
      \vspace{1.2pt}
      
     \textbf{\normalsize{ML Architectures:}}{ \normalsize{CNN, YOLO, Transformers(BERT, LSTM), RAFT}}

     % copy and paste above textbf block to add more 
     }}
 \end{itemize}
 \vspace{-16pt}
 
 %-----------EXPERIENCE-----------
\section{\color{airforceblue}WORK EXPERIENCE}
  \resumeSubHeadingListStart

    \resumeSubheading
      {Job 1 Title}{} 
      {Company Name, State, Country}{Month Year - Month Year}
      \resumeItemListStart
            \resumeItem{\normalsize{Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eget nunc ultricies congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.}}
            \resumeItem{\normalsize{nteger hendrerit semper velit, non vehicula nibh feugiat nec. Vivamus nec consequat nisi. Suspendisse potenti. Sed consectetur elit sed aliquam eleifend.}}  
            \resumeItem{\normalsize{Sed nec quam et urna placerat placerat. Aenean at mi id nunc venenatis feugiat}}  
      \resumeItemListEnd  

    \resumeSubheading
      {Job 2 Title}{} 
      {Company Name, State, Country}{Month Year - Month Year}
      \resumeItemListStart
            \resumeItem{\normalsize{Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eget nunc ultricies congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.}}
            \resumeItem{\normalsize{nteger hendrerit semper velit, non vehicula nibh feugiat nec. Vivamus nec consequat nisi. Suspendisse potenti. Sed consectetur elit sed aliquam eleifend.}}  
            \resumeItem{\normalsize{Sed nec quam et urna placerat placerat. Aenean at mi id nunc venenatis feugiat}}  
      \resumeItemListEnd  

    \resumeSubheading
      {Job 3 Title}{} 
      {Company Name, State, Country}{Month Year - Month Year}
      \resumeItemListStart
            \resumeItem{\normalsize{Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eget nunc ultricies congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.}}
            \resumeItem{\normalsize{nteger hendrerit semper velit, non vehicula nibh feugiat nec. Vivamus nec consequat nisi. Suspendisse potenti. Sed consectetur elit sed aliquam eleifend.}}  
            \resumeItem{\normalsize{Sed nec quam et urna placerat placerat. Aenean at mi id nunc venenatis feugiat}}  
      \resumeItemListEnd  

    % copy and paste above resumeSubheading block to add more 
  \resumeSubHeadingListEnd
\vspace{-12pt}


 %-----------PROJECTS-----------
\section{\color{airforceblue}PROJECTS}    
    \resumeItemListStart
        \vspace{0.5pt}
        \resumeItem{\normalsize{\textbf{Project 1 title}, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo eget nunc ultricies congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae.} \href{[url to project github repo]}{\color{blue}\underline{GitHub}}}
        \vspace{-5pt}
        
        \resumeItem{\normalsize{\textbf{Project 2 title}, Vivamus nec consequat nisi. Suspendisse potenti. Sed consectetur elit sed aliquam eleifend. Sed nec quam et urna placerat placerat.} \href{[url to project demo]}{\color{blue}\underline{Try it!}}}
        \vspace{-5pt}

        \resumeItem{\normalsize{\textbf{Project 3 title}, Cras dignissim justo vitae dui vehicula, sed malesuada risus semper. Maecenas suscipit sapien nec ultrices consequat. Sed volutpat justo id magna rhoncus, nec ultricies libero ultrices. Sed malesuada efficitur sapien, a ultricies nulla posuere nec.}  \href{[url to github repo]}{\color{blue}\underline{GitHub}}}
        \vspace{-5pt}

        \resumeItem{\normalsize{\textbf{Project 4 title}, Sed sagittis consectetur eros, eu auctor felis lobortis vel. Sed eu risus at nunc viverra finibus. Curabitur eu quam libero. Sed euismod ante in tellus efficitur, sit amet accumsan mi sodales.} \href{[url to project demo]}{\color{blue}\underline{Try it!}}}

        % copy and paste above resumeItem block to add more 
        
    \resumeItemListEnd  
   
 \vspace{-12pt}
%

%-----------Publications---------------
\section{\color{airforceblue}PUBLICATIONS}
    
  \resumeItemListStart
    \resumeItem{\normalsize{Add Publication details here}}\href{[url link to publication]}{\color{blue}\underline{Link}}
    \vspace{-5pt}
    
    \resumeItem{\normalsize{Add Publication details here}}\href{[url link to publication]}{\color{blue}\underline{Link}}
    \vspace{-5pt}

    % copy and paste above resumeItem block to add more 
    
  \resumeItemListEnd 
      
\vspace{-8pt}

%-----------EXTRACURRICULAR---------------
\section{\color{airforceblue}EXTRACURRICULAR ACTIVITIES}
    
      \resumeItemListStart
        \resumeItem{\normalsize{\textbf{Event Coordinator} in univesrity Club - {Month Year - Month Year} }} 
        \vspace{-5pt}
        
        \resumeItem{\normalsize{\textbf{Executive member} in Robotics Club - } {Month Year - Month Year}}    
        \vspace{-5pt}

        % copy and paste above resumeItem block to add more 
      \resumeItemListEnd 
      
\vspace{-12pt}

\end{document}
`
  },
];
