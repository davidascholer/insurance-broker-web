import Footer from "@/components/Footer";
import Header from "../components/header/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";

const Terms = () => {
  const navigate = useNavigate();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/terms",
      title: "Terms",
    });
  }, []);
  
  return (
    <div>
      <Header />
      <div
        className="px-10 pb-10 pt-36 flex flex-col gap-4 bg-(--light-pink)"
        data-sqsp-text-block-content=""
      >
        <p className="whitespace-pre-wrap">
          PIPA Broker, LLC (“<strong>PIPA Broker</strong>”, “
          <strong>PIPA</strong>”, “<strong>Company</strong>”, “
          <strong>we</strong>”, “<strong>us</strong>”, or “<strong>our</strong>
          ”) welcomes you.&nbsp; These Terms of Service (“<strong>Terms</strong>
          ”) govern your use of the PIPA Broker website(s), application
          programming interfaces, content, Products and other services offered
          by PIPA, as well as PIPA services offered through third parties
          integrating PIPA functionality (collectively, the “
          <strong>Services</strong>”).&nbsp;&nbsp;PIPA provides the
          Services.&nbsp;&nbsp;“<strong>You</strong>” refers to you as a user of
          any of the Services.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>
            THE DISPUTE RESOLUTION SECTION IN SECTION 15 OF THESE TERMS CONTAINS
            A MUTUAL ARBITRATION AGREEMENT AND CLASS ACTION WAIVER THAT REQUIRES
            YOU AND PIPA TO RESOLVE DISPUTES WITH EACH OTHER ON AN INDIVIDUAL
            BASIS THROUGH FINAL AND BINDING ARBITRATION.&nbsp;&nbsp;PLEASE
            REVIEW THE DISPUTE RESOLUTION SECTION OF THESE TERMS
            CAREFULLY.&nbsp;&nbsp;BY AGREEING TO THESE TERMS, YOU EXPRESSLY
            ACKNOWLEDGE THAT YOU HAVE READ AND UNDERSTAND ALL OF THE TERMS OF
            THIS AGREEMENT AND HAVE TAKEN TIME TO CONSIDER THE CONSEQUENCES OF
            THIS IMPORTANT DECISION.
          </strong>
        </p>
        <p className="whitespace-pre-wrap">
          <strong>1. Acceptance of these Terms&nbsp;</strong>
        </p>
        <p className="whitespace-pre-wrap">
          By agreeing to these Terms, and/or by using or accessing the Services
          (including without an account), you expressly acknowledge that you
          understand and accept all of the terms (including the dispute
          resolution and arbitration provisions below).&nbsp;&nbsp;BY USING THE
          SERVICES, YOU ARE AGREEING TO THESE TERMS.&nbsp;&nbsp;PLEASE READ THEM
          CAREFULLY.&nbsp;&nbsp;IF YOU DO NOT AGREE TO BE BOUND BY THE TERMS AND
          CONDITIONS OF THESE TERMS, YOU MAY NOT USE OR ACCESS THE
          SERVICES.&nbsp;
        </p>
        <p className="whitespace-pre-wrap">
          <strong>2. Changes to these Terms</strong>
        </p>
        <p className="whitespace-pre-wrap">
          PIPA may, in its sole discretion, amend the Terms and modify or update
          the Services from time to time.&nbsp;&nbsp;If we change these Terms,
          we will give you notice by posting the revised Terms on the
          Services.&nbsp;&nbsp;Please review this page periodically to ensure
          you are up to date with any changes.&nbsp;&nbsp;Those changes will go
          into effect on the revision date shown in the revised
          Terms.&nbsp;&nbsp;Your continued use of the Services will constitute
          your acceptance of the amended Terms.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>3. Additional Terms</strong>
        </p>
        <p className="whitespace-pre-wrap">
          Our&nbsp;Privacy Policy&nbsp;and other Policies applicable to your use
          of the Services are incorporated by reference into these Terms (the “
          <strong>Additional Terms</strong>”), as updated from time to
          time.&nbsp;&nbsp;BY ACCESSING OR USING THE SERVICES, YOU ACCEPT THESE
          ADDITIONAL TERMS.&nbsp;&nbsp;We will make Additional Terms available
          for you to read through the Services.&nbsp;&nbsp;If you do not agree
          to abide by the Additional Terms, you automatically opt out of and are
          prohibited from using the Services.&nbsp;&nbsp;If you violate the
          provisions of the Additional Terms, PIPA may, in its sole discretion,
          suspend, discontinue, or change your account or any aspect of your
          access to or use of the Services in whole or in part.&nbsp;&nbsp;By
          continuing to use the Services, you agree to the Additional Terms and
          any future amendments and additions to the Additional Terms as
          published from time to time through the Services.&nbsp;&nbsp;Please
          review the Additional Terms periodically to ensure you are up to date
          with any changes.&nbsp;
        </p>
        <p className="whitespace-pre-wrap">
          <strong>
            4. Your Consent to Receive Emails and Other Communications
          </strong>
        </p>
        <p className="whitespace-pre-wrap">
          You expressly consent to receive and accept communications from PIPA,
          our Affiliates (as defined below), and their respective
          representatives via e-mail or other comparable means at any of the
          e-mail addresses and/or telephone numbers provided by you or on your
          behalf to PIPA.&nbsp;&nbsp;You agree that the foregoing authorized
          communications may be initiated for any advertising, marketing,
          promotional, account administration, or other purposes.&nbsp;&nbsp;IF
          YOU WISH TO OPT OUT OF EMAIL MESSAGES FROM US, YOU AGREE TO OPT OUT BY
          FOLLOWING ANY UNSUBSCRIBE INSTRUCTIONS PROVIDED TO YOU IN THOSE
          COMMUNICATIONS.&nbsp;&nbsp;You agree that PIPA and our Affiliates and
          representatives will not be responsible for honoring opt-out requests
          communicated through other channels.&nbsp;&nbsp;PLEASE BE ADVISED THAT
          IF YOU OPT OUT OF MARKETING COMMUNICATIONS, PIPA MAY STILL SEND YOU
          COMMUNICATIONS ABOUT YOUR ACCOUNT OR ANY TRANSACTIONS BETWEEN YOU,
          PIPA, AND/OR OTHER USERS OF THE PLATFORM.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>5. Eligibility</strong>
        </p>
        <p className="whitespace-pre-wrap">
          You must be at least 18 years old to use the Services.&nbsp;&nbsp;If
          you are under the age of majority in your state of residence or a
          minor, your parent or legal guardian must agree to these Terms on your
          behalf and you may only access and use the Services with permission
          from your parent or legal guardian.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>6. Acceptable Use of the Services</strong>
        </p>
        <p className="whitespace-pre-wrap">
          You are responsible for your use of the Services, and for any use of
          the Services made using your account.&nbsp;&nbsp;Our goal is to create
          a positive, useful, and safe user experience.&nbsp;&nbsp;To promote
          this goal, we prohibit certain kinds of conduct that may be harmful to
          other users, third parties, or to us.&nbsp;&nbsp;When you use the
          Services, you may not:
        </p>
        <ul
          data-rte-list="default"
          className="list-disc pl-12 flex flex-col gap-2"
        >
          <li>
            <p className="whitespace-pre-wrap">
              violate any law or regulation or use the Services for any
              unintended or illegal purposes;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              violate, infringe, or misappropriate other people’s intellectual
              property, privacy, publicity, or other legal rights;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              provide false information in your profile on, or registration for,
              the Services;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              post or share anything that is illegal, abusive, harassing,
              harmful to reputation, pornographic, indecent, profane, obscene,
              hateful, racist, or otherwise objectionable;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              send unsolicited or unauthorized advertising or commercial
              communications, such as spam;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              engage in spidering or harvesting, or participate in the use of
              software, including spyware, designed to collect data from the
              Services;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              transmit any viruses, malicious codes, or other computer
              instructions or technological means whose purpose is to disrupt,
              damage, or interfere with the use of computers or related systems;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              stalk, harass, or harm another individual;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              impersonate any person or entity, maintain more than one account
              (or, if PIPA suspends or terminates your account, create further
              accounts), or perform any other fraudulent activity, such as
              phishing, marketplace collusion, promotional abuse, and payment
              fraud;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              use any means to scrape or crawl any Web pages contained in the
              Services;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              use the Services for purposes of competing with PIPA;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              authorize other users to use your user status or transfer your
              account to any other person or entity;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              attempt to circumvent any technological measure implemented by us,
              any of our providers, or any other third party (including another
              user) to protect the Services;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              interfere with PIPA’s provision of, or any other user’s use of,
              the Services;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              attempt to decipher, decompile, disassemble, or reverse engineer
              any of the software or other underlying code used to provide the
              Services;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              solicit another user’s username and password for the Services;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              post information that is intentionally inaccurate or misleading,
              or that violate these Terms or Additional Terms; or
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              advocate, encourage, or assist any third party in doing any of the
              foregoing.
            </p>
          </li>
        </ul>
        <p className="whitespace-pre-wrap">
          <strong>7. User Content</strong>
        </p>
        <p className="whitespace-pre-wrap">
          The Services allow you to upload, submit, store, send, or receive
          data, information, and content (“<strong>User Content</strong>
          ”).&nbsp;&nbsp;You retain ownership of any intellectual property
          rights that you hold in that User Content.&nbsp;&nbsp;In other words,
          you own your personal data.
        </p>
        <p className="whitespace-pre-wrap">
          When you upload, submit, store, send, or receive User Content to or
          through the Services, you give us permission to reproduce and use your
          User Content as follows:&nbsp;&nbsp;you grant to us and those we work
          with a license to use, host, store, reproduce, modify, create
          derivative works (including, but not limited to, translations,
          adaptations, or other changes we make so that User Content works
          better with the Services), publicly perform, publicly display, and
          distribute your User Content in order to operate, promote, market, and
          improve our Services.&nbsp;&nbsp;Our license to your User Content is
          non-exclusive, meaning you may use the User Content for your own
          purposes or let others use your User Content for their
          purposes.&nbsp;&nbsp;This license is irrevocable, sublicensable,
          fully-paid, and royalty free, meaning we do not owe you anything else
          in connection with our use of your User Content.&nbsp;&nbsp;We may
          exercise our rights under this license anywhere in the
          world.&nbsp;&nbsp;Lastly, this license is perpetual, meaning that our
          rights under this license continue even after you stop using the
          Services.&nbsp;&nbsp;In general, however, we will only need to use
          your User Content for as long as you choose to store it with us using
          the Services.
        </p>
        <p className="whitespace-pre-wrap">You promise that:</p>
        <ul
          data-rte-list="default"
          className="list-disc pl-12 flex flex-col gap-2"
        >
          <li>
            <p className="whitespace-pre-wrap">
              you own all rights to your User Content or, alternatively, that
              you have the right to give us the rights described above
              (including having the necessary consents and releases from any
              individuals who appear or whose pets appear in your User Content);
              and
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              your User Content does not infringe the intellectual property
              rights, privacy rights, publicity rights, or other legal rights of
              any third party.
            </p>
          </li>
        </ul>
        <p className="whitespace-pre-wrap">
          We may refuse to accept or transmit User Content for any
          reason.&nbsp;&nbsp;We reserve the right to use, share, and display
          your User Content in any manner in connection with our business
          without attribution to you or your approval.&nbsp;&nbsp;You
          acknowledge and agree that we are distributors (without any obligation
          to verify) and not publishers of your User Content, and we reserve the
          right to monitor, screen, edit, or remove your User Content in the
          event that such content include obscenities or other objectionable
          content, include an individual’s name or other personal information,
          or violate any privacy laws, other applicable laws, or Company’s
          content policies.&nbsp;&nbsp;Our failure to enforce our rights under
          these Terms in one instance does not create a waiver of our right to
          enforce them in another instance.&nbsp;&nbsp;We are not obligated to
          provide you with copies of your User Content, nor will we have any
          liability to you for any deletion, disclosure, loss, or modification
          to your User Content.
        </p>
        <p className="whitespace-pre-wrap">
          If you include your name, image, likeness or voice in any of your User
          Content, you grant us permission to use your name, image, voice, and
          likeness, and hereby release us from any liability arising from such
          use, including, without limitation, claims for invasion of privacy,
          infringement of your right of publicity, and defamation (including
          libel and slander).
        </p>
        <p className="whitespace-pre-wrap">
          The Services may provide the ability to User Content publicly and/or
          privately.&nbsp;&nbsp;You acknowledge that even User Content shared
          privately may be shared with third parties in accordance with
          applicable law and our Privacy Policy and that PIPA has no obligation
          to preserve or indefinitely store any reviews.&nbsp;
        </p>
        <p className="whitespace-pre-wrap">
          <strong>8. Ownership</strong>
        </p>
        <p className="whitespace-pre-wrap">
          Other than User Content, we own or license all right, title, and
          interest in and to:&nbsp;&nbsp;(a) the Services, including all
          software, text, media, and other content available on the Services (“
          <strong>Our Content</strong>”); and (b) our trademarks, logos, and
          brand elements (“<strong>Marks</strong>”).&nbsp;&nbsp;The Services,
          Our Content, and Marks are all protected under U.S. and international
          laws.&nbsp;&nbsp;The look and feel of the Services are copyright ©
          PIPA Broker, LLC.&nbsp;&nbsp;All rights reserved.&nbsp;&nbsp;You may
          not duplicate, copy, or reuse any portion of the HTML/CSS, Javascript,
          or visual design elements or concepts without express written
          permission from us.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>9. Copyright and Intellectual Property Policy</strong>
        </p>
        <p className="whitespace-pre-wrap">
          We respond to notices of alleged copyright infringement and terminate
          accounts of repeat infringers according to the process set out in the
          U.S. Digital Millennium Copyright Act.&nbsp;&nbsp;If you believe that
          your work has been copied in a way that constitutes copyright
          infringement, please forward the following information to the
          Copyright Agent named below:
        </p>
        <ul
          data-rte-list="default"
          className="list-disc pl-12 flex flex-col gap-2"
        >
          <li>
            <p className="whitespace-pre-wrap">
              Your address, telephone number, and email address.
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              A description of the copyrighted work that you claim has been
              infringed.
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              A description of where the alleged infringing material is located.
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              A statement by you that you have a good faith belief that the
              disputed use is not authorized by you, the copyright owner, its
              agent, or the law.&nbsp;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              An electronic or physical signature of the person authorized to
              act on behalf of the owner of the copyright interest.
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              A statement by you, made under penalty of perjury, that the above
              information is accurate and that you are the copyright owner or
              authorized to act on behalf of the copyright owner.
            </p>
          </li>
        </ul>
        <p className="whitespace-pre-wrap">Copyright Agent:</p>
        <p className="whitespace-pre-wrap">
          For clarity, only copyright infringement notices should be sent to our
          Copyright Agent at&nbsp;<strong>admin@pipabroker.com</strong>
          .&nbsp;&nbsp;You acknowledge that if you fail to comply with all of
          the requirements of this section, your notice may not be valid.
        </p>
        <p className="whitespace-pre-wrap">
          If you believe the content that was removed (or to which access was
          disabled) is not infringing, or that you have the authorization from
          the copyright owner, the copyright owner's agent, or pursuant to the
          law, to post and use such content, you may submit a counter-notice to
          the Copyright Agent address listed above containing the following
          information:
        </p>
        <ul
          data-rte-list="default"
          className="list-disc pl-12 flex flex-col gap-2"
        >
          <li>
            <p className="whitespace-pre-wrap">
              Your physical or electronic signature;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              Identification of the content that has been removed or to which
              access has been disabled and the location at which the content
              appeared before it was removed or disabled;
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              A statement that you have a good faith belief that the content was
              removed or disabled as a result of a mistake or a
              misidentification of the content; and
            </p>
          </li>
          <li>
            <p className="whitespace-pre-wrap">
              Your name, physical address, telephone number, and e-mail address,
              a statement that you consent to the jurisdiction of the federal
              court in King County, Washington, and a statement that you will
              accept service of process from the person who provided
              notification of the alleged infringement.
            </p>
          </li>
        </ul>
        <p className="whitespace-pre-wrap">
          After we receive your counter-notification, we will forward it to the
          party who submitted the original claim of copyright
          infringement.&nbsp;&nbsp;Please note that when we forward the
          counter-notification, it includes your personal
          information.&nbsp;&nbsp;By submitting a counter-notification, you
          consent to having your information revealed in this way.&nbsp;&nbsp;We
          will not forward the counter-notification to any party other than the
          original claimant.
        </p>
        <p className="whitespace-pre-wrap">
          After we send out the counter-notification, the claimant must then
          notify us within ten (10) days that he or she has filed an action
          seeking a court order to restrain you from engaging in infringing
          activity relating to the content that was removed or
          disabled.&nbsp;&nbsp;If we receive such notification, we will be
          unable to restore the material. If we do not receive such
          notification, we may reinstate the material.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>10. Privacy</strong>
        </p>
        <p className="whitespace-pre-wrap">
          Your privacy is very important to us.&nbsp;&nbsp;Our&nbsp;
          <button
            onClick={() => navigate("/privacy")}
            className="underline text-(--primary-coral) cursor-pointer"
          >
            Privacy Policy
          </button>
          &nbsp;explains how we collect, store, use, protect, and when we share
          personal information and other data with others.&nbsp;&nbsp;You are
          responsible for maintaining the confidentiality of your account
          information, including your username and password.&nbsp;&nbsp;You are
          responsible for all activities that occur under your account and you
          agree to notify us immediately of any unauthorized access or use of
          your account.&nbsp;&nbsp;We are not responsible or liable for any
          damage or loss related to any unauthorized access or use of your
          account, including without limitation, as a result of phishing or
          other similar attacks.
        </p>
        <p className="whitespace-pre-wrap">
          PIPA may use third-party web analytics services on the Services, such
          as Google Analytics.&nbsp;&nbsp;This technology analyzes how the
          Services are used by visitors and may also provide the third-party
          website from which a user arrives. The information collected by the
          technology will be disclosed to or collected directly by these
          third-party service providers, who use the information to evaluate
          your use of the Services.&nbsp;&nbsp;PIPA also uses Google Analytics
          for certain purposes related to advertising.&nbsp;&nbsp;For more
          information on this please see the PIPA&nbsp;
          <button
            onClick={() => navigate("/privacy")}
            className="underline text-(--primary-coral) cursor-pointer"
          >
            Privacy Policy
          </button>
          .&nbsp;&nbsp;To prevent Google Analytics from using your information
          for analytics, you may install the Google Analytics&nbsp;
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-(--primary-coral) cursor-pointer"
          >
            Opt-Out Browser Add-on
          </a>
          .
        </p>
        <p className="whitespace-pre-wrap">
          <strong>11. Third-Party Content</strong>
        </p>
        <p className="whitespace-pre-wrap">
          The Services may contain links to other websites and online resources
          and the Services may be made available or accessed in connection with
          third-party services and content (including advertising) that PIPA
          does not control.&nbsp;&nbsp;You acknowledge that different terms of
          use and privacy policies may apply to your use of such third-party
          websites, services, and content.&nbsp;&nbsp;PIPA does not endorse such
          third-party websites, services, and content and in no event shall PIPA
          be responsible or liable for any damage or loss related to the use of
          websites, products, services, or content of such third-party
          providers.
        </p>
        <p className="whitespace-pre-wrap">
          Reviews, profiles, advice, opinions, statements, offers, postings, or
          other information or content made available through the Services, but
          not directly by PIPA, are those of their respective authors, who are
          solely responsible for such content.
        </p>
        <p className="whitespace-pre-wrap">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PIPA DOES
          NOT:&nbsp;&nbsp;(A) WARRANT THE ACCURACY, ADEQUACY, OR COMPLETENESS OF
          CONTENT AVAILABLE ON OR THROUGH THE SERVICES; OR (B) ADOPT, ENDORSE,
          OR ACCEPT RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY
          OPINION, ADVICE, OR STATEMENT MADE BY ANY PARTY OTHER THAN PIPA.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>12. Suspension and Termination</strong>
        </p>
        <p className="whitespace-pre-wrap">
          We reserve the right to not provide the Services to any
          person.&nbsp;&nbsp;We also reserve the right to suspend or terminate
          any user’s right to access the Services at any time, in our sole
          discretion, for any reason (or no reason at all).&nbsp;&nbsp;If your
          conduct on the Services or with respect to the Services is
          inappropriate or unsafe or you violate any of these Terms or the
          Additional Terms, your permission to use the Services automatically
          terminates.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>13. Disclaimer and Limitations on Our Liability</strong>
        </p>
        <p className="whitespace-pre-wrap">
          13.1 General Disclaimer and Limitations
        </p>
        <p className="whitespace-pre-wrap">
          YOU USE THE SERVICES AND ANY CONTENT AND PRODUCTS AVAILABLE ON OR
          THROUGH THE SERVICES AT YOUR OWN RISK.&nbsp;&nbsp;THE SERVICES AND ANY
          CONTENT AND PRODUCTS AVAILABLE ON OR THROUGH THE SERVICES ARE PROVIDED
          ON AN “AS IS” AND “AS AVAILABLE” BASIS.&nbsp;&nbsp;TO THE EXTENT
          PERMITTED BY APPLICABLE LAW, PIPA AND ITS OFFICERS, EMPLOYEES,
          DIRECTORS, SHAREHOLDERS, PARENTS, SUBSIDIARIES, AFFILIATES, AGENTS,
          AND LICENSORS (“<strong>AFFILIATES</strong>”) DISCLAIM ALL WARRANTIES,
          CONDITIONS, AND REPRESENTATIONS OF ANY KIND, WHETHER EXPRESS, IMPLIED,
          STATUTORY, OR OTHERWISE, INCLUDING THOSE RELATED TO MERCHANTABILITY,
          SATISFACTORY QUALITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT AND THOSE ARISING OUT OF COURSE OF DEALING OR USAGE
          OF TRADE.
        </p>
        <p className="whitespace-pre-wrap">
          IN PARTICULAR, PIPA AND ITS AFFILIATES MAKE NO REPRESENTATIONS OR
          WARRANTIES ABOUT THE ACCURACY OR COMPLETENESS OF CONTENT AVAILABLE ON
          OR THROUGH THE SERVICES, PRODUCTS OFFERED FOR SALE THROUGH THE
          SERVICES, OR THE CONTENT OF ANY WEBSITES OR ONLINE SERVICES LINKED TO
          OR INTEGRATED WITH THE SERVICES.&nbsp;&nbsp;PIPA AND ITS AFFILIATES
          WILL HAVE NO LIABILITY FOR ANY:&nbsp;&nbsp;(a) ERRORS, MISTAKES, OR
          INACCURACIES OF CONTENT; (b) PERSONAL INJURY, INJURY TO ANY PETS, OR
          PROPERTY DAMAGE RESULTING FROM YOUR ACCESS TO OR USE OF THE SERVICES;
          (c) ANY INTERRUPTION OF TRANSMISSION TO OR FROM THE SERVICES; (d) ANY
          BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED ON
          OR THROUGH THE SERVICES BY ANY THIRD PARTY; OR (e) ANY LOSS OR DAMAGE
          OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED OR
          SHARED OR ANY PRODUCT OFFERED FOR SALE THROUGH THE SERVICES.&nbsp;
        </p>
        <p className="whitespace-pre-wrap">
          YOU UNDERSTAND AND AGREE THAT ANY MATERIAL OR INFORMATION DOWNLOADED
          OR OTHERWISE OBTAINED THROUGH THE USE OF THE SERVICES IS DONE AT YOUR
          OWN RISK AND THAT YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGES
          ARISING FROM DOING SO.&nbsp;&nbsp;NO ADVICE OR INFORMATION, WHETHER
          ORAL OR WRITTEN, OBTAINED BY YOU FROM US OR THROUGH THE SERVICES WILL
          CREATE ANY WARRANTY NOT EXPRESSLY MADE.&nbsp;&nbsp;YOU ACKNOWLEDGE AND
          AGREE THAT YOU MAY BE INTRODUCED TO A THIRD PARTY THAT MAY POSE HARM
          OR RISK TO YOU OR OTHER THIRD PARTIES. YOU ARE ADVISED TO TAKE
          REASONABLE PRECAUTIONS WITH RESPECT TO INTERACTIONS WITH THIRD PARTIES
          ENCOUNTERED IN CONNECTION WITH THE USE OF THE SERVICES.
        </p>
        <p className="whitespace-pre-wrap">
          YOU FURTHER ACKNOWLEDGE THAT THERE ARE RISKS INHERENT IN INTERNET
          CONNECTIVITY THAT COULD RESULT IN THE LOSS OF YOUR PRIVACY,
          CONFIDENTIAL INFORMATION, DATA AND/OR CONTENT.&nbsp;&nbsp;WE HAVE NO
          OBLIGATION TO PROVIDE SECURITY.&nbsp;&nbsp;YOU SHALL HAVE SOLE
          RESPONSIBILITY FOR THE ACCURACY, QUALITY, INTEGRITY, LEGALITY,
          RELIABILITY, APPROPRIATENESS, AND OWNERSHIP OF ALL OF YOUR DATA AND
          USER CONTENT THAT MAY APPEAR ON THE SERVICES.&nbsp;
        </p>
        <p className="whitespace-pre-wrap">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT WILL WE
          BE LIABLE TO YOU OR TO ANY THIRD PARTY FOR ANY DIRECT, INDIRECT,
          SPECIAL, COMPENSATORY, INCIDENTAL, PUNITIVE, OR CONSEQUENTIAL DAMAGES
          (INCLUDING FOR LOSS OF PROFITS, REVENUE, OR DATA) OR FOR THE COST OF
          OBTAINING SUBSTITUTE PRODUCTS ARISING OUT OF OR IN CONNECTION WITH
          THESE TERMS, HOWEVER CAUSED, WHETHER SUCH LIABILITY ARISES FROM ANY
          CLAIM BASED UPON CONTRACT, WARRANTY, TORT (INCLUDING NEGLIGENCE),
          STRICT LIABILITY, OR OTHERWISE, AND WHETHER OR NOT WE’VE BEEN ADVISED
          OF THE POSSIBILITY OF SUCH DAMAGES.&nbsp;&nbsp;FOR EXAMPLE, WE SHALL
          NOT BE RESPONSIBLE FOR YOUR CONDUCT OR ANY THIRD-PARTY CONDUCT,
          INCLUDING WITHOUT LIMITATION, BODILY INJURY, INJURY TO ANY PETS,
          EMOTIONAL DISTRESS, AND/OR ANY OTHER DAMAGES THAT MAY RESULT FROM YOUR
          USE OF THE SERVICES, OR FOR ANY INTERACTIONS WITH OTHER USERS OF THE
          SERVICES, WHETHER ONLINE OR OFFLINE. FURTHERMORE, YOU AGREE THAT IN NO
          EVENT WILL WE BE LIABLE FOR ANY LOSSES, DAMAGE, OR HARM THAT ARISE OUT
          OF YOUR VIOLATION OF THESE TERMS OR ADDITIONAL TERMS.
        </p>
        <p className="whitespace-pre-wrap">
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR TOTAL
          CUMULATIVE LIABILITY TO YOU OR ANY THIRD PARTY UNDER THESE TERMS, FROM
          ALL CAUSES OF ACTION AND ALL THEORIES OF LIABILITY, WILL BE LIMITED TO
          AND WILL NOT EXCEED THE FEES YOU HAVE ACTUALLY PAID TO US DURING THE
          TWELVE (12) MONTHS PRECEDING THE CLAIM GIVING RISE TO SUCH
          LIABILITY.&nbsp;
        </p>
        <p className="whitespace-pre-wrap">
          We do not warrant that the quality of any products, Services,
          information, or other material purchased or obtained by you will meet
          your expectations. While we aim to display product colors and images
          as accurately as possible, we cannot guarantee that your computer
          monitor's display of any color will be accurate. We reserve the right
          to correct or update any information, and to change or update
          information or cancel orders if any information is inaccurate at any
          time without prior notice (including after you have submitted your
          order), but disclaim any obligation to do so except as required by
          law.
        </p>
        <p className="whitespace-pre-wrap">
          You are solely responsible for determining whether products are
          suitable for use or consumption by your pet. Any nutrition,
          ingredient, allergen, or other product information is provided by the
          product manufacturers or suppliers and may be modified by the
          manufacturers from time to time. PIPA does not represent or warrant
          that such information is accurate or complete, and we recommend that
          you do not rely solely on the information presented. Please consult
          the product label or contact the manufacturer directly if you have a
          specific dietary or allergic concern or any other question about a
          product.
        </p>
        <p className="whitespace-pre-wrap">
          You understand and agree that we have entered into these Terms with
          you in reliance upon the limitations of liability set forth in these
          Terms, which allocate risk between us and form the basis of the
          bargain between the parties.
        </p>
        <p className="whitespace-pre-wrap">
          13.2 Disclaimer of Professional Advice
        </p>
        <p className="whitespace-pre-wrap">
          The reviews and information provided through the Services are for
          informational purposes only.&nbsp;&nbsp;The Services do not provide
          medical or veterinary advice or any medical, veterinary, healthcare,
          or wellness service.&nbsp;&nbsp;The Services are not a substitute for
          the professional judgement of a veterinary or other medical
          professional and are not in any way intended to substitute for or
          override professional veterinary advice, diagnosis, or
          treatment.&nbsp;&nbsp;Always seek the advice of your veterinarian or
          other qualified health provider with any question you may have
          regarding a pet’s medical condition. If you think your pet may have a
          medical emergency, call your veterinarian, animal control, PETA, or
          911 for help immediately.
        </p>
        <p className="whitespace-pre-wrap">
          You also acknowledge and agree that you are using the Services at your
          own risk and are not covered by any privilege or confidentiality
          obligation that might apply if you were to obtain your own
          professional advice.
        </p>
        <p className="whitespace-pre-wrap">
          No matter the qualifications of the person affiliated with the
          Services, you expressly acknowledge that use of the Service is NOT a
          substitute for veterinary care (whether emergency or otherwise), and
          you further acknowledge that PIPA cannot provide advice or
          consultation over the internet regarding any specific medical
          condition (whether of an emergency nature, or
          otherwise).&nbsp;&nbsp;If your pet is sick, injured, or otherwise in
          need of medical attention, you should contact your regular
          veterinarian or local emergency provider of veterinary services
          immediately, as PIPA is not the appropriate venue to deal with such
          situations.
        </p>
        <p className="whitespace-pre-wrap">
          You also expressly acknowledge and agree that the Services will NOT be
          able to diagnose, treat, or prescribe any medication for your
          pet.&nbsp;&nbsp;You further acknowledge that the laws, regulations,
          other governing authorities, standards, practices, and procedures that
          apply to your particular question may differ depending upon your
          location or upon the information that typically would be discovered
          through in-person (or in-pet) evaluations or visits.&nbsp;&nbsp;
        </p>
        <p className="whitespace-pre-wrap">
          We highly recommend that you always seek the advice of your
          veterinarian or other qualified provider with any questions that you
          may have regarding your pet’s medical condition, and that you do not
          disregard their advice (or delay seeking their advice) because of
          something that you have read or otherwise been provided through the
          Services.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>14. Indemnification</strong>
        </p>
        <p className="whitespace-pre-wrap">
          You agree to indemnify and hold harmless PIPA and its Affiliates from
          and against any and all claims, costs, proceedings, demands, losses,
          damages, and expenses (including, without limitation, reasonable
          attorneys’ fees and legal costs) of any kind or nature, arising from
          or relating to, any (i) actual or alleged breach of these Terms or the
          Additional Terms by you or anyone using your account, including claims
          arising from a breach of any of the obligations set forth in these
          Terms or Additional Terms; (ii) transactions, interactions or disputes
          with other users of the Services, whether online or offline; (iii)
          your misstatements, omissions, misrepresentations, or violation of
          applicable law; (iv) any of Your Content; (v) any text messages or
          other communications that you initiate to other Users or to third
          parties through our Services; and (vi) the actions of your pet(s),
          including any property damage or personal injury to third parties
          caused by your pet or pets under your care.&nbsp;&nbsp;YOU FURTHER
          AGREE THAT YOU WILL COOPERATE WITH US IN THE DEFENSE AND INVESTIGATION
          OF SUCH CLAIMS. WE RESERVE THE RIGHT TO ASSUME THE EXCLUSIVE DEFENSE
          AND CONTROL OF ANY MATTER SUBJECT TO INDEMNIFICATION UNDER THIS
          SECTION, AND YOU WILL NOT SETTLE ANY SUCH CLAIM OR MATTER WITHOUT OUR
          PRIOR WRITTEN CONSENT.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>
            15. Arbitration Agreement &amp; Waiver of Certain Rights
          </strong>
        </p>
        <p className="whitespace-pre-wrap">
          For purposes of this Section 22 (“
          <strong>Arbitration Agreement</strong>”), references to “PIPA” include
          our Affiliates.
        </p>
        <p className="whitespace-pre-wrap">
          a.&nbsp;<strong>Applicability</strong>.&nbsp;&nbsp;You and PIPA agree
          that any dispute or claim arising out of or relating in any way to
          your use of the Services, these Terms, the Additional Terms, your
          relationship with PIPA, or your receipt of any communications from
          PIPA will be resolved by binding arbitration on an individual basis,
          rather than in court, except that you may assert claims in small
          claims court to the extent your claims qualify, remain in such court,
          and advance solely on an individual basis.&nbsp;&nbsp;“Disputes” or
          “claims” under this provision shall include, but are not limited to,
          any dispute, claim, or controversy, whether based on past, present, or
          future events, arising out of or relating to: the Terms, the
          Additional Terms and prior versions thereof (including the breach,
          termination, enforcement, interpretation or validity thereof), the
          Services, any other goods, services, or content made available through
          the Services, your relationship with PIPA, the threatened or actual
          suspension, deactivation, or termination of your account with PIPA any
          promotions or offers made by PIPA, any communications you receive from
          PIPA, any claims for fraud, defamation, emotional distress, breach of
          any express or implied contract or covenant, claims arising under
          federal or state consumer protection laws, claims arising under
          antitrust laws, claims arising under the Telephone Consumer Protection
          Act and Fair Credit Reporting Act, and claims arising under the
          Uniform Trade Secrets Act, Civil Rights Act of 1964, Americans With
          Disabilities Act, and state statutes, if any, addressing the same or
          similar subject matters, and all other federal and state statutory and
          common law claims.&nbsp;&nbsp;Notwithstanding anything to the contrary
          herein, if you are an employee of PIPA, this Arbitration Agreement
          will not apply to any claims or disputes arising out of your
          employment relationship with PIPA and any such claims and disputes may
          be governed by separate agreements.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>b. Arbitration Rules and Forum.</strong>&nbsp;The Federal
          Arbitration Act governs the interpretation and enforcement of this
          Arbitration Agreement. To begin an arbitration proceeding, the
          initiating party must notify the other party in writing via certified
          mail, return receipt requested, or hand delivery within the applicable
          statute of limitations period. This demand for arbitration must
          include (1) the name and address of the party seeking arbitration, (2)
          a statement of the legal and factual basis of the claim, and (3) a
          description of the remedy sought. Any demand for arbitration by you
          must be delivered to Attn. Director of Legal PIPA Broker, LLC, 1706 SW
          Holly St, Seattle, WA, 98106 and <strong>admin@pipabroker.com</strong>
          . The arbitration will be conducted by the American Arbitration
          Association (“&nbsp;<strong>AAA</strong>”), an established alternative
          dispute resolution provider, and conducted under AAA’s most current
          version of the Commercial Arbitration Rules and procedures available
          at&nbsp;
          <a
            href="https://go.adr.org/rs/294-SFS-516/images/Commercial_Rules_Web.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-(--primary-coral) cursor-pointer"
          >
            https://go.adr.org/rs/294-SFS-516/images/Commercial_Rules_Web.pdf
          </a>
          .&nbsp;&nbsp;AAA’s rules are also available by calling AAA at
          800-778-7879. If AAA is not available to arbitrate, the parties will
          select a reasonably equivalent alternative arbitral
          forum.&nbsp;&nbsp;If the arbitrator finds that you cannot afford to
          pay filing, administrative, hearing, and/or other fees necessary for
          the arbitration and you cannot obtain a waiver for such fees, PIPA
          will pay them for you.&nbsp;&nbsp;In addition, PIPA will reimburse all
          such filing, administrative, hearing and/or other fees for proceedings
          involving claims totaling less than $10,000 unless the arbitrator
          determines the claims are frivolous.&nbsp;&nbsp;PIPA will not seek
          attorneys' fees and costs in arbitration unless the arbitrator
          determines your claims are frivolous.&nbsp;&nbsp;You may choose to
          have the arbitration conducted by telephone, based on written
          submissions, in person, or at another mutually agreed
          location.&nbsp;&nbsp;Any judgment on the award rendered by the
          arbitrator may be entered in any court of competent jurisdiction.
        </p>
        <p className="whitespace-pre-wrap">
          c.&nbsp;<strong>Authority of Arbitrator.</strong>&nbsp;&nbsp;The
          arbitrator -- not a court -- shall have exclusive authority to (i)
          determine the scope and enforceability of these Terms (including this
          Arbitration Agreement), (ii) resolve any&nbsp;&nbsp;dispute related to
          the interpretation, applicability, enforceability, or formation of
          these Terms (including this Arbitration Agreement), including, but not
          limited to, any claim that all or any part of this Arbitration
          Agreement is void or voidable, and (iii) resolve any disputes or
          controversies regarding or arising out of the applicability of these
          Terms, the Additional Terms, the Pet Care Provider Platform Use
          Agreement, and/or any other concurrent agreement, to any particular
          claim or dispute, consistent with the AAA Commercial Arbitration Rule
          R-7 (or similar rule if not arbitrated by the AAA).&nbsp;&nbsp;The
          arbitration will decide the rights and liabilities, if any, of you and
          PIPA.&nbsp;&nbsp;The arbitrator shall have the authority to grant
          motions dispositive of all or part of any claim. The arbitrator shall
          have the authority to award monetary damages and to grant any
          non-monetary remedy or relief available to an individual under
          applicable law, the arbitral forum’s rules, and these Terms (including
          this Arbitration Agreement).&nbsp;&nbsp;The arbitrator shall issue a
          written award and statement of decision describing the essential
          findings and conclusions on which the award is based, including the
          calculation of any damages awarded.&nbsp;&nbsp;The arbitrator has the
          same authority to award relief on an individual basis that a judge in
          a court of law would have.&nbsp;&nbsp;The award of the arbitrator is
          final and binding upon you and PIPA.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>d. Waiver of Jury Trial.</strong>&nbsp;&nbsp;YOU AND PIPA
          HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO SUE IN COURT
          AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY.&nbsp;&nbsp;There is no
          judge or jury in arbitration, and court review of an arbitration award
          is subject to very limited review.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>
            e. Waiver of Class or Other Non-Individualized Relief.
          </strong>
          &nbsp;&nbsp;ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS
          ARBITRATION AGREEMENT MUST BE ARBITRATED ON AN INDIVIDUAL BASIS AND
          NOT ON A CLASS, REPRESENTATIVE, OR COLLECTIVE BASIS; ONLY INDIVIDUAL
          RELIEF IS AVAILABLE, AND CLAIMS OF MORE THAN ONE PARTY CANNOT BE
          ARBITRATED OR CONSOLIDATED WITH THOSE OF ANY OTHER
          PARTY.&nbsp;&nbsp;If a decision is issued stating that applicable law
          precludes enforcement of any of this subsection’s limitations as to a
          given claim for relief, then the claim must be severed from the
          arbitration and brought into the federal or state court located in
          King County, Washington for adjudication before a judge, not a
          jury.&nbsp;&nbsp;All other claims shall be arbitrated.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>f. Survival of Arbitration Agreement.</strong>&nbsp;&nbsp;This
          Arbitration Agreement will survive the termination of your
          relationship with PIPA.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>g. Modification.</strong>&nbsp;&nbsp;Notwithstanding any
          provision in these Terms to the contrary, we agree that if PIPA makes
          any future material change to this Arbitration Agreement, you may
          reject that change within thirty (30) days of such change becoming
          effective by emailing PIPA a notice of your rejection to{" "}
          <strong>admin@pipabroker.com</strong>&nbsp;&nbsp;Your rejection of any
          such changes shall not affect the enforceability of any prior version
          of this Arbitration Agreement, or of any other agreement to arbitrate,
          that you previously entered into with PIPA.
        </p>
        <p className="whitespace-pre-wrap">
          <strong>16. Other Provisions</strong>
        </p>
        <p className="whitespace-pre-wrap">
          Under no circumstances will PIPA be held liable for any delay or
          failure in performance due in whole or in part to any acts of nature
          or other causes beyond our reasonable control.
        </p>
        <p className="whitespace-pre-wrap">
          These Terms will be governed by and construed in accordance with the
          laws of the State of California, consistent with the Federal
          Arbitration Act, without giving effect to any conflict of laws rules
          or provisions.&nbsp;&nbsp;In the event the Arbitration Agreement above
          is found not to apply to you or a particular claim or dispute, you
          agree that any action of whatever nature arising from or relating to
          these Terms or Services will be filed only in the state or federal
          courts located in King County, Washington.&nbsp;&nbsp;You and PIPA
          consent and submit to the personal jurisdiction of such courts for the
          purposes of any such action.&nbsp;&nbsp;
        </p>
        <p className="whitespace-pre-wrap">
          YOU AND PIPA HEREBY WAIVE, TO THE FULLEST EXTENT PERMITTED BY
          APPLICABLE LAW, ANY RIGHT TO TRIAL BY JURY IN ANY LEGAL PROCEEDINGS
          ARISING OUT OF OR RELATING IN ANY WAY TO THE SERVICES, THESE TERMS,
          THE ADDITIONAL TERMS, YOUR RELATIONSHIP WITH PIPA, OR YOUR RECEIPT OF
          ANY COMMUNICATIONS WITH PIPA.
        </p>
        <p className="whitespace-pre-wrap">
          If any provision of these Terms is found to be unlawful or
          unenforceable, then that provision will be deemed severable from these
          Terms and will not affect the enforceability of any other
          provisions.&nbsp;&nbsp;The failure by us to enforce any right or
          provision of these Terms will not be deemed a waiver and will not
          prevent us from enforcing such right or provision in the future.
        </p>
        <p className="whitespace-pre-wrap">
          We may freely assign our rights and obligations under these Terms,
          including in connection with a merger, acquisition, reorganization,
          sale of assets or equity, or by operation of law.&nbsp;&nbsp;You may
          not assign any rights or obligations under these Terms without the
          prior written consent of PIPA and any purported assignment in
          violation of this provision shall be null and void.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
