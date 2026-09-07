import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ClipboardCheck,
  Download,
  Clock3,
  HardHat,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  X,
  Wrench,
  Zap,
} from 'lucide-react';

const imageBase = '/images/machinery/';

const fleet = [
  { name: 'Liebherr 922 Rail', detail: '22t HiRail · dual gauge', image: `${imageBase}922_2_-_Damarc_Civil.jpeg`, tag: 'HiRail' },
  { name: 'Hitachi ZX135US', detail: '15t HiRail · tri gauge', image: `${imageBase}02-hitachi-zx135us.jpg`, tag: 'HiRail' },
  { name: 'Hydrema 912', detail: '10t HiRail · dual gauge', image: `${imageBase}03-hydrema-912.jpg`, tag: 'HiRail' },
  { name: 'Volvo ECR88', detail: '8t HiRail · dual gauge', image: `${imageBase}04-volvo-ecr88.jpg`, tag: 'HiRail' },
  { name: 'Caterpillar 336', detail: '36t excavator · Trimble 3D earthworks GPS', image: `${imageBase}922_336_6_-_Damarc_Civil.jpeg`, tag: 'Civil plant' },
  { name: 'Hitachi 175W', detail: '17t wheeled excavator · Trimble 3D earthworks GPS', image: `${imageBase}922_175_-_Damarc_Civil.jpeg`, tag: 'Civil plant' },
  { name: 'Volvo L90', detail: '16t loader', image: `${imageBase}07-volvo-l90.jpg`, tag: 'Civil plant' },
  { name: 'Case CX145', detail: '14t excavator · Trimble 3D earthworks GPS', image: `${imageBase}08-case-cx145.jpg`, tag: 'Civil plant' },
  { name: 'Hitachi ZX65', detail: '6.5t excavator', image: `${imageBase}09-hitachi-zx65.jpg`, tag: 'Civil plant' },
  { name: 'Bobcat', detail: '3.5t Posi Track', image: `${imageBase}10-bobcat-posi-track.jpg`, tag: 'Civil plant' },
];

const services = [
  { icon: Truck, title: 'HiRail plant hire', text: 'Compliant, well-maintained HiRail equipment for possessions, maintenance and corridor works.' },
  { icon: Wrench, title: 'Civil plant hire', text: 'A versatile fleet of excavators, loaders and support vehicles ready for demanding sites.' },
  { icon: HardHat, title: 'Labour hire', text: 'Experienced operators and crews who understand the pace and discipline of live infrastructure.' },
  { icon: Zap, title: 'Rail corridor works', text: 'Practical support for drainage, earthworks, vegetation management and trackside works.' },
  { icon: ClipboardCheck, title: 'Shutdown support', text: 'Responsive planning and delivery for planned possessions, shutdowns and urgent callouts.' },
  { icon: Sparkles, title: 'Specialist attachments', text: 'The right attachment for the task, from rail grabs and threaders to breakers and sweepers.' },
];

const attachmentGroups = [
  'Rail grabs', 'Threaders', 'Crackers', 'Sleeper grabs', 'Tamping heads', 'Rail de-clippers',
  'Rail brooms', 'Octopus attachments', 'Undercutter bars', 'Mulchers', 'Magnets',
  'Concrete kibbles', 'Augers', 'Spreader bars', 'Rock breakers', 'Sweepers',
];

const approvals = ['Sydney Trains', 'MTS', 'Sydney Metro SSTOM', 'John Holland', 'UGL', 'ARTC', 'Metro Trains Melbourne', 'V/Line'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [plantListStatus, setPlantListStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('sending');
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', '758a6c98-40a4-430b-8339-d2f98e44a39c');
    formData.append('subject', 'New Damarc Civil website enquiry');
    formData.append('from_name', 'Damarc Civil website');

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Unable to send');
      setFormStatus('sent');
      form.reset();
    } catch {
      setFormStatus('error');
    }
  };

  const handlePlantListSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPlantListStatus('sending');
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', '758a6c98-40a4-430b-8339-d2f98e44a39c');
    formData.append('subject', 'Damarc Civil plant list download');
    formData.append('from_name', 'Damarc Civil plant list download');

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Unable to send');
      const downloadLink = document.createElement('a');
      downloadLink.href = '/Damarc_Civil_Plant_List_v3_NAVY.pdf';
      downloadLink.download = 'Damarc_Civil_Plant_List_v3_NAVY.pdf';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      setPlantListStatus('sent');
      form.reset();
    } catch {
      setPlantListStatus('error');
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="topline"><div className="container topline-inner"><span>Specialist rail and civil plant hire across Australia</span><a href="tel:0450367695"><Phone size={14} /> 0450 367 695</a></div></div>
        <div className="container nav-wrap">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Damarc Civil home"><img src="/images/Outlook-image002.p_-_Damarc_Civil.png" alt="Damarc Civil" /></a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
          <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
            <a href="#about" onClick={closeMenu}>About</a><a href="#services" onClick={closeMenu}>Services</a><a href="#fleet" onClick={closeMenu}>Plant & Equipment</a><a href="#safety" onClick={closeMenu}>Safety</a><a href="#gallery" onClick={closeMenu}>Gallery</a><a href="#contact" onClick={closeMenu}>Contact</a>
            <a className="nav-cta" href="#contact" onClick={closeMenu}>Request a quote <ArrowRight size={16} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-image" />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="hero-copy reveal"><p className="eyebrow light"><span className="eyebrow-line" /> Damarc Civil Pty Ltd · Est. 2017</p><h1>Specialist Rail<br /><em>and Civil</em> Plant Hire</h1><p className="hero-lede">Compliant equipment, experienced operators and responsive project support for rail and civil infrastructure works across Australia.</p><div className="hero-actions"><a className="button button-blue" href="#contact">Request a free quote <ArrowRight size={18} /></a><a className="phone-link" href="tel:0450367695"><span className="phone-circle"><Phone size={16} /></span> Call 0450 367 695</a></div><div className="hero-note"><Check size={15} /> Same-day and emergency enquiries available</div></div>
            <div className="quote-card reveal"><div className="quote-card-head"><div><p className="eyebrow">Project enquiry</p><h2>Let’s get to work.</h2></div><div className="card-mark"><ArrowRight size={18} /></div></div><p className="form-intro">Tell us what you need and our team will come back to you promptly.</p>
              {formStatus === 'sent' ? <div className="form-message success"><Check size={24} /><h3>Thanks, we’ve got it.</h3><p>Your enquiry has been sent. Marc will be in touch shortly.</p><button className="text-button" onClick={() => setFormStatus('idle')}>Send another enquiry <ArrowRight size={15} /></button></div> : <form onSubmit={handleSubmit} className="quote-form"><div className="form-grid"><label>Name<input name="name" required placeholder="Your name" /></label><label>Phone<input name="phone" type="tel" required placeholder="Your phone number" /></label></div><label>Email<input name="email" type="email" required placeholder="you@company.com" /></label><label>How can we help?<textarea name="message" required rows={3} placeholder="Tell us about your project, equipment or dates..." /></label><button className="button button-dark form-submit" type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'Sending enquiry...' : 'Send enquiry'} <ArrowRight size={17} /></button>{formStatus === 'error' && <p className="form-error">Something went wrong. Please call us on 0450 367 695.</p>}<p className="form-footnote">Your details are only used to respond to your enquiry.</p></form>}
            </div>
          </div>
          <a className="scroll-cue" href="#about"><span>Scroll to explore</span><ChevronDown size={17} /></a>
        </section>

        <section className="trust-strip"><div className="container trust-inner"><p>Trusted project support for</p><div className="approval-list">{approvals.slice(0, 5).map((approval) => <span key={approval}>{approval}</span>)}</div><a href="#safety">Our compliance approach <ArrowRight size={15} /></a></div></section>

        <section id="about" className="section about-section"><div className="container about-grid"><div className="section-intro"><p className="eyebrow">01 / About Damarc</p><h2>Built for the work<br /><span>behind the work.</span></h2></div><div className="about-copy"><p className="lead">Damarc Civil supplies compliant HiRail equipment, experienced RIW-competent operators, civil machinery, specialist attachments and labour for the projects that keep Australia moving.</p><p>From overnight possessions to major infrastructure programs, we understand the pressure on every shift. Our role is to make sure the right people, plant and support arrive ready to perform.</p><div className="director-note"><div className="director-icon"><Award size={21} /></div><div><p className="eyebrow">A message from our director</p><p>“Damarc Civil is led by major civil and infrastructure construction management experience. That gives us a practical understanding of project pressures, safety, productivity, clear communication and reliable delivery.”</p><strong>Marc McCaffrey <span>Director</span></strong></div></div></div></div></section>

        <section id="services" className="section services-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">02 / What we do</p><h2>Ready for the<br /><span>critical path.</span></h2></div><p>One responsive team for the plant, people and practical know-how your project needs on site.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, text }, index) => <article className="service-card" key={title}><div className="service-number">0{index + 1}</div><Icon className="service-icon" size={26} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`Enquire about ${title}`}><ArrowRight size={17} /></a></article>)}</div></div></section>

        <section id="fleet" className="section fleet-section"><div className="container"><div className="section-heading fleet-heading"><div><p className="eyebrow">03 / Plant & equipment</p><h2>Plant that performs<br /><span>when it matters.</span></h2></div><p>Our fleet is maintained, inspected and prepared for the demands of rail corridors, civil sites and major infrastructure.</p></div><div className="fleet-grid">{fleet.map((machine) => <article className="fleet-card" key={machine.name}><div className="fleet-image"><img src={machine.image} alt={machine.name} loading="lazy" /><span>{machine.tag}</span></div><div className="fleet-info"><h3>{machine.name}</h3><p>{machine.detail}</p><a href="#contact">Enquire <ArrowRight size={15} /></a></div></article>)}</div><div className="fleet-more"><div><p className="eyebrow">Support fleet</p><p>Crew trucks, tippers, tool vans, work utes, trailers and support vehicles.</p></div><a className="button button-outline" href="#contact">Ask about availability <ArrowRight size={17} /></a></div></div></section>

        <section className="plant-list-section"><div className="container plant-list-card"><div className="plant-list-copy"><p className="eyebrow">Fleet capability document</p><h2>Download our<br /><span>Plant List.</span></h2><p>See the full Damarc Civil fleet, support vehicles and specialist attachments in one concise capability document.</p><div className="plant-list-meta"><span><Check size={15} /> HiRail plant</span><span><Check size={15} /> Civil equipment</span><span><Check size={15} /> Attachments</span></div></div><div className="plant-list-form-wrap">{plantListStatus === 'sent' ? <div className="plant-list-success"><div className="success-icon"><Check size={22} /></div><h3>Your plant list is ready.</h3><p>The PDF download should have started automatically.</p><a className="button button-blue" href="/Damarc_Civil_Plant_List_v3_NAVY.pdf" download="Damarc_Civil_Plant_List_v3_NAVY.pdf">Download again <Download size={17} /></a></div> : <form className="plant-list-form" onSubmit={handlePlantListSubmit}><label>Name<input name="plant_list_name" required placeholder="Your name" /></label><label>Mobile<input name="plant_list_mobile" type="tel" required placeholder="Your mobile number" /></label><label>Email<input name="plant_list_email" type="email" required placeholder="you@company.com" /></label><button className="button button-dark" type="submit" disabled={plantListStatus === 'sending'}>{plantListStatus === 'sending' ? 'Preparing download...' : 'Download plant list'} <Download size={17} /></button>{plantListStatus === 'error' && <p className="form-error">We couldn’t process that request. Please try again or call 0450 367 695.</p>}<p className="form-footnote">Your details are only used to send the plant list and respond to your enquiry.</p></form>}</div></div></section>

        <section id="safety" className="safety-section"><div className="container safety-grid"><div className="safety-visual"><img src={`${imageBase}922_5_-_Damarc_Civil.jpeg`} alt="Damarc Civil Liebherr 922 HiRail machinery ready for work" loading="lazy" /><div className="safety-badge"><ShieldCheck size={28} /><span>Safety<br /><strong>first</strong></span></div></div><div className="safety-copy"><p className="eyebrow light">04 / Safety & compliance</p><h2>Confidence is<br /><em>built in.</em></h2><p className="safety-lede">We take the details seriously, so your team can focus on delivering the project.</p><div className="safety-points"><div><ClipboardCheck size={19} /><span>Pre-start procedures, plant inspections and documented defect management.</span></div><div><HardHat size={19} /><span>Skilled, experienced and RIW-competent operators who understand rail environments.</span></div><div><Clock3 size={19} /><span>Reliable delivery and responsive support for planned and emergency works.</span></div></div><p className="approval-label">Approvals and experience across</p><div className="approval-chips">{approvals.map((approval) => <span key={approval}>{approval}</span>)}</div></div></div></section>

        <section className="attachments-section"><div className="container attachments-grid"><div><p className="eyebrow">Specialist capability</p><h2>The right tool<br /><span>for the task.</span></h2><p>Our attachment range helps crews work safely and productively across changing site conditions.</p></div><div className="attachment-list">{attachmentGroups.map((attachment) => <span key={attachment}><Check size={14} /> {attachment}</span>)}</div></div></section>

        <section id="gallery" className="section gallery-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">05 / In the field</p><h2>Work ready.<br /><span>Site proven.</span></h2></div><p>A closer look at the machinery and people supporting rail and civil projects across the country.</p></div><div className="gallery-grid"><div className="gallery-large"><img src={`${imageBase}922_2_-_Damarc_Civil.jpeg`} alt="Liebherr 922 HiRail excavators" loading="lazy" /><div className="gallery-caption">HiRail capability <span>01</span></div></div><div><img src={`${imageBase}02-hitachi-zx135us.jpg`} alt="Hitachi ZX135US HiRail excavator" loading="lazy" /><div className="gallery-caption">Rail corridor works <span>02</span></div></div><div><img src={`${imageBase}922_336_6_-_Damarc_Civil.jpeg`} alt="Caterpillar excavators on civil site" loading="lazy" /><div className="gallery-caption">Civil plant <span>03</span></div></div><div className="gallery-wide"><img src={`${imageBase}Damarc_922_1_-_Damarc_Civil.jpeg`} alt="HiRail excavator and support fleet" loading="lazy" /><div className="gallery-caption">Ready to mobilise <span>04</span></div></div></div></div></section>

        <section id="contact" className="contact-section"><div className="container contact-grid"><div><p className="eyebrow light">06 / Start a conversation</p><h2>Let’s move<br /><em>your project</em><br />forward.</h2><p className="contact-lede">Same-day and emergency enquiries are welcome. Talk to the people who understand the work.</p><a className="contact-phone" href="tel:0450367695"><span><Phone size={18} /></span> 0450 367 695</a><a className="contact-email" href="mailto:damarccivil@outlook.com">damarccivil@outlook.com <ArrowUpRightIcon /></a></div><div className="contact-details"><div className="detail-row"><MapPin size={20} /><div><strong>Visit us</strong><p>U213, 42 Page Street<br />Pagewood NSW 2035</p></div></div><div className="detail-row"><ShieldCheck size={20} /><div><strong>Business details</strong><p>Damarc Civil Pty Ltd<br />ABN 11 605 631 534</p></div></div><div className="detail-row"><Truck size={20} /><div><strong>Service area</strong><p>Australia wide</p></div></div></div></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-top"><a className="brand footer-brand" href="#home"><img src="/images/Outlook-image002.p_-_Damarc_Civil.png" alt="Damarc Civil" /></a><p>Specialist rail and civil plant hire<br />for the work that keeps Australia moving.</p><div className="footer-links"><a href="#about">About</a><a href="#services">Services</a><a href="#fleet">Fleet</a><a href="#contact">Contact</a></div><a className="footer-quote" href="#contact">Request a free quote <ArrowRight size={16} /></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Damarc Civil Pty Ltd. All rights reserved.</span><a href="https://www.itscold.com.au" target="_blank" rel="noreferrer">Website by Go Polar <ArrowUpRightIcon /></a></div></footer>
    </div>
  );
}

function ArrowUpRightIcon() { return <ArrowRight size={15} className="arrow-up" />; }

export default App;
