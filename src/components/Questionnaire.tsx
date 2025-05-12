import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Question from './Question';
import GojoImage from './GojoImage';
import RandomFooter from './RandomFooter';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const QuestionButton: React.FC<ButtonProps> = ({ onClick, children, className = '' }) => (
  <button 
    onClick={onClick} 
    className={`brainrot-button ${className}`}
  >
    {children}
  </button>
);

type QuestionState = 
  | 'initial'
  | 'chooseNo'
  | 'chooseNoImportant'
  | 'chooseNoImportantYes'
  | 'chooseNoImportantNoLied'
  | 'chooseNoVL'
  | 'chooseYes'
  | 'chooseYesYes'
  | 'chooseYesNo'
  | 'chooseYesNoLame'
  | 'chooseYesNoKidding'
  | 'blackout'
  | 'showFinalChoice'
  | 'collectEmail';

const Questionnaire = () => {
  const [questionState, setQuestionState] = useState<QuestionState>('initial');
  const [clickCount, setClickCount] = useState(0);
  const [playGlitch, setPlayGlitch] = useState(false);
  const [finalChoice, setFinalChoice] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const emailFormRef = useRef<HTMLFormElement>(null);

  const handleCornerClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) {
        document.body.classList.add('blackout');
        setQuestionState('blackout');
      }
      return newCount;
    });
  };

  useEffect(() => {
    if (questionState === 'chooseYesNoLame') {
      document.body.classList.add('blackout');
      setPlayGlitch(true);
      
      const flash = () => {
        document.body.classList.add('flash');
        setTimeout(() => {
          document.body.classList.remove('flash');
        }, 150);
      };
      
      flash();
      const flashInterval = setInterval(flash, 2000);
      
      return () => {
        clearInterval(flashInterval);
        document.body.classList.remove('blackout');
        document.body.classList.remove('flash');
        setPlayGlitch(false);
      };
    }
  }, [questionState]);

  const renderQuestionContent = () => {
    switch (questionState) {
      case 'initial':
        return (
          <Question question="A je e lirë nesër?">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton onClick={() => setQuestionState('chooseYes')}>Po</QuestionButton>
              <QuestionButton onClick={() => setQuestionState('chooseNo')}>Jo</QuestionButton>
            </div>
          </Question>
        );

      case 'chooseNo':
        return (
          <Question question="A është punë e rëndësishme apo punë vl?">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton onClick={() => setQuestionState('chooseNoImportant')}>Rëndësishme</QuestionButton>
              <QuestionButton onClick={() => setQuestionState('chooseNoVL')}>Vl</QuestionButton>
            </div>
          </Question>
        );

      case 'chooseNoImportant':
        return (
          <Question question="Are you sure?">
            <div className="meme-container mb-4">
              <img src="/omniman.jpg" alt="Omni-Man Meme" className="mx-auto max-w-full rounded-lg mb-4" 
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton onClick={() => {
                setFinalChoice('Important Work');
                setQuestionState('showFinalChoice');
              }}>Yes</QuestionButton>
              <QuestionButton onClick={() => setQuestionState('chooseNoImportantNoLied')}>No I lied</QuestionButton>
            </div>
          </Question>
        );

      case 'chooseNoImportantYes':
        return (
          <Question question="Understandable. Still, fuck you tho!">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton onClick={() => {
                setFinalChoice('Important Work');
                setQuestionState('showFinalChoice');
              }}>Start over</QuestionButton>
            </div>
          </Question>
        );

      case 'chooseNoImportantNoLied':
        return (
          <Question question="Awesome, ok dalim nesër në X orë (we decide it)">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton onClick={() => {
                setFinalChoice('Not Important Work');
                setQuestionState('showFinalChoice');
              }}>Start over</QuestionButton>
            </div>
          </Question>
        );

      case 'chooseNoVL':
        return (
          <Question question="Damn gng pse ke pun vl n mes te dites...bitchass...">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton onClick={() => {
                setFinalChoice('VL');
                setQuestionState('showFinalChoice');
              }}>Start over</QuestionButton>
            </div>
          </Question>
        );

      case 'chooseYes':
        return (
          <Question question="Awesome, nesër në X orë then?">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton onClick={() => setQuestionState('chooseYesYes')}>Yes</QuestionButton>
              <QuestionButton onClick={() => setQuestionState('chooseYesNo')}>No</QuestionButton>
            </div>
          </Question>
        );

      case 'chooseYesYes':
        return (
          <Question question="Alrighttt bettt!">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton onClick={() => {
                setFinalChoice('Yes');
                setQuestionState('showFinalChoice');
              }}>Start over</QuestionButton>
            </div>
          </Question>
        );

      case 'chooseYesNo':
        return (
          <Question question="A ke arsye valide apo thjesht përton dhe je lame as fuck...?">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton onClick={() => setQuestionState('chooseYesNoLame')}>Pertoj se jam lame</QuestionButton>
              <QuestionButton onClick={() => setQuestionState('chooseYesNoKidding')}>Nah I'm just kidding les do it</QuestionButton>
            </div>
          </Question>
        );

      case 'chooseYesNoKidding':
        return (
          <Question question="Alright awesome flasim për orarin!">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton onClick={() => {
                setFinalChoice('Kidding');
                setQuestionState('showFinalChoice');
              }}>Start over</QuestionButton>
            </div>
          </Question>
        );

      case 'chooseYesNoLame':
        return (
          <div className="ip-screen w-full h-full flex items-center justify-center">
            <p className="text-white font-mono text-4xl md:text-6xl animate-pulse">189.133.24.36</p>
            {playGlitch}
          </div>
        );

      case 'blackout':
        return (
          <Question question="You are now trapped in the Infinite Void.">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton 
                onClick={() => {
                  document.body.classList.remove('blackout');
                  setQuestionState('initial');
                }}
                className="text-white border-white hover:bg-white hover:text-black"
              >
                Release me
              </QuestionButton>
            </div>
          </Question>
        );

      case 'showFinalChoice':
        return (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <p className="text-2xl md:text-4xl font-bold mb-8">Your final choice was:</p>
            <p className="text-xl md:text-3xl font-semibold mb-8">{finalChoice}</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton 
                onClick={() => setQuestionState('collectEmail')}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Submit my answer
              </QuestionButton>
              <QuestionButton 
                onClick={() => {
                  setFinalChoice(null);
                  setQuestionState('initial');
                }}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Start Over
              </QuestionButton>
            </div>
          </div>
        );

      case 'collectEmail':
        const sendEmail = (e: React.FormEvent) => {
          e.preventDefault();
          
          if (!emailFormRef.current) return;
          
          setEmailStatus('sending');
          
          const serviceId = 'service_su2db3f';
          const templateId = 'template_un0sk9g';
          const publicKey = 'MQxX3zq9BjiElVc_4';
          
          const formData = new FormData();
          formData.append('user_answer', finalChoice || '');
          formData.append('submission_date', new Date().toLocaleString());
          formData.append('user_email', userEmail || 'noemail@provided.com');
          formData.append('to_email', 'karatmezile@gmail.com');
          formData.append('message', `User selected: ${finalChoice}`);
          formData.append('content', `The user completed the questionnaire and selected: ${finalChoice}`);
          formData.append('from_name', userEmail ? "User with email" : "Anonymous User");
          formData.append('answer', finalChoice || '');
          formData.append('subject', `Questionnaire Response: ${finalChoice}`);
          formData.append('reply_to', userEmail || 'noreply@example.com');
          
          emailjs.sendForm(
            serviceId,
            templateId,
            emailFormRef.current,
            publicKey
          )
            .then((result) => {
              console.log('SUCCESS!', result.text);
              setEmailStatus('success');
              setTimeout(() => {
                setFinalChoice(null);
                setUserEmail('');
                setEmailStatus('idle');
                setQuestionState('initial');
              }, 3000);
            })
            .catch((error) => {
              console.error('FAILED...', error);
              setEmailStatus('error');
            });
        };
        
        return (
          <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <p className="text-2xl md:text-3xl font-bold mb-6">Submit your answer</p>
            
            {emailStatus === 'idle' && (
              <form ref={emailFormRef} onSubmit={sendEmail} className="w-full max-w-md">
                {/* Hidden fields for EmailJS */}
                <input type="hidden" name="user_answer" value={finalChoice || ''} />
                <input type="hidden" name="submission_date" value={new Date().toLocaleString()} />
                <input type="hidden" name="to_email" value="karatmezile@gmail.com" />
                <input type="hidden" name="message" value={`User selected: ${finalChoice}`} />
                <input type="hidden" name="content" value={`The user completed the questionnaire and selected: ${finalChoice}`} />
                <input type="hidden" name="from_name" value={userEmail ? "User with email" : "Anonymous User"} />
                <input type="hidden" name="answer" value={finalChoice || ''} />
                <input type="hidden" name="subject" value={`Questionnaire Response: ${finalChoice}`} />
                <input type="hidden" name="reply_to" value={userEmail || 'noreply@example.com'} />
                
                <div className="mb-6">
                  <label htmlFor="user_email" className="block text-sm font-medium mb-2">
                    Your Email (optional)
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    E ke opsionale obviously esht thjesht per confirmation po dont bother!
                  </p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-300"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionState('showFinalChoice')}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md transition duration-300"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}
            
            {emailStatus === 'sending' && (
              <div className="text-center">
                <p className="text-xl font-medium mb-2">Sending your answer...</p>
                <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              </div>
            )}
            
            {emailStatus === 'success' && (
              <div className="text-center text-green-600">
                <p className="text-xl font-medium mb-2">Your answer has been sent successfully!</p>
                <p>Redirecting to the start page...</p>
              </div>
            )}
            
            {emailStatus === 'error' && (
              <div className="text-center text-red-600">
                <p className="text-xl font-medium mb-2">Error sending your answer</p>
                <p className="mb-4">Please check the browser console and try again later.</p>
                <button
                  onClick={() => {
                    setEmailStatus('idle');
                    setQuestionState('showFinalChoice');
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md transition duration-300"
                >
                  Back
                </button>
              </div>
            )}
          </div>
        );

      default:
        return (
          <Question question="Something went wrong">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <QuestionButton onClick={() => setQuestionState('initial')}>Start over</QuestionButton>
            </div>
          </Question>
        );
    }
  };

  return (
    <div className="questionnaire">
      <div className="corner" onClick={handleCornerClick} />

      {questionState !== 'chooseYesNoLame' && <GojoImage questionState={questionState} />}

      {renderQuestionContent()}

      {questionState !== 'chooseYesNoLame' && <RandomFooter />}
    </div>
  );
};

export default Questionnaire;