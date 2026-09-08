import { CSSProperties, FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Download,
  Facebook,
  HardHat,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
  X,
  Zap,
} from 'lucide-react';

const imageBase = '/images/machinery/';

/* ------------------------------------------------------------------ *
 * SOCIAL LINKS
 * Paste the real profile URLs below and the "Follow our work" block
 * appears in the contact section automatically. Any entry left as an
 * empty string is skipped, so nothing ever links to a dead page.
 * ------------------------------------------------------------------ */
const socials = [
  { name: 'LinkedIn', icon: Linkedin, url: '' },
  { name: 'Facebook', icon: Facebook, url: '' },
  { name: 'Instagram', icon: Instagram, url: '' },
].filter((social) => social.url.length > 0);

/* ------------------------------------------------------------------ *
 * CLIENT / ACCREDITATION LOGOS
 * Files live in /public/images/. Rail authorities first, then the
 * contractors and delivery partners. `note` prints a small caption
 * under the tile, used to tie a consortium back to its project.
 * TODO: Webuild artwork still to come - drop the file into
 * /public/images/ and add a row here with note: 'Sydney Metro SSTOM'.
 * ------------------------------------------------------------------ */
const clients = [
  { name: 'Sydney Trains', file: 'image2.png' },
  { name: 'Sydney Metro', file: 'image1.jpeg' },
  { name: 'Metro Trains Sydney', file: 'image0.jpeg' },
  { name: 'ARTC', file: 'image1.png' },
  { name: 'V/Line', file: 'image3.jpeg' },
  { name: 'Parklife Metro', file: 'image0.png', note: 'Sydney Metro SSTOM' },
  { name: 'UGL Regional Linx', file: 'image2.jpeg' },
  { name: 'John Holland', file: 'john.png' },
  { name: 'Laing O’Rourke', file: 'laing.png' },
  { name: 'MACA', file: 'maca.png' },
  { name: 'Thee Group', file: 'thee.png' },
  { name: 'Select', file: 'select.png' },
  { name: 'Rocktown', file: 'rocktown.png' },
  { name: 'Ladmore Management & Consulting', file: 'image001.png' },
];

const fleet = [
  {
    name: '22t HiRail Excavator',
    model: 'Liebherr A922 Rail · rubber tyred',
    text: 'Dual gauge rubber tyred hi-rail excavator for possessions, trackside drainage, ballast handling and rail grab work.',
    image: `${imageBase}922_2_-_Damarc_Civil.jpeg`,
    tag: 'HiRail',
  },
  {
    name: '15t HiRail Excavator',
    model: 'Hitachi ZX135US · tracked',
    text: 'Tri gauge tracked hi-rail excavator with reduced tail swing for corridor works in tight clearances.',
    image: `${imageBase}02-hitachi-zx135us.jpg`,
    tag: 'HiRail',
  },
  {
    name: '10t HiRail Side Tip Dump Truck',
    model: 'Hydrema 912 · dual gauge',
    text: 'Hi-rail side tip dump truck for spoil removal, ballast and material haulage on and off track.',
    image: `${imageBase}03-hydrema-912.jpg`,
    tag: 'HiRail',
  },
  {
    name: '8t HiRail Excavator',
    model: 'Volvo ECR88 · tracked',
    text: 'Compact dual gauge hi-rail excavator for confined corridor, platform and tight access rail works.',
    image: `${imageBase}04-volvo-ecr88.jpg`,
    tag: 'HiRail',
  },
  {
    name: '36t 3D GPS Excavator',
    model: 'Caterpillar 336',
    text: 'Trimble 3D GPS machine control for bulk earthworks, batters and design to grade civil excavation.',
    image: `${imageBase}922_336_6_-_Damarc_Civil.jpeg`,
    tag: 'Civil plant',
  },
  {
    name: '17t 3D GPS Wheeled Excavator',
    model: 'Hitachi 175W',
    text: 'Trimble 3D GPS wheeled excavator for roadworks, service trenching and urban civil sites.',
    image: `${imageBase}922_175_-_Damarc_Civil.jpeg`,
    tag: 'Civil plant',
  },
  {
    name: '16t Loader',
    model: 'Volvo L90 · bucket, forks, lifting jib',
    text: 'Wheel loader with bucket, pallet forks and lifting jib for material handling, load out and site logistics.',
    image: `${imageBase}07-volvo-l90.jpg`,
    tag: 'Civil plant',
  },
  {
    name: '14t 3D GPS Excavator',
    model: 'Case CX145',
    text: 'Trimble 3D GPS excavator for trimming, drainage, pits and detail earthworks to design.',
    image: `${imageBase}08-case-cx145.jpg`,
    tag: 'Civil plant',
  },
  {
    name: '5 to 6.5t Excavator',
    model: 'Hitachi ZX65',
    text: 'Midi excavator for tight access excavation, service works and small footprint civil sites.',
    image: `${imageBase}09-hitachi-zx65.jpg`,
    tag: 'Civil plant',
  },
  {
    name: '3.5t / 75hp Posi Track',
    model: 'Bobcat tracked loader',
    text: 'Tracked loader for site clean up, levelling and material handling across soft or uneven ground.',
    image: `${imageBase}10-bobcat-posi-track.jpg`,
    tag: 'Civil plant',
  },
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

const heroFacts = [
  { value: 'Est. 2017', label: 'Specialist rail and civil' },
  { value: '10+ machines', label: 'HiRail and civil plant' },
  { value: 'RIW competent', label: 'Operators and crews' },
  { value: 'Australia wide', label: 'Mobilised on request' },
];

function ClientLogo({ name, file, note }: { name: string; file: string; note?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="client-logo">
      <div className={failed ? 'client-tile is-wordmark' : 'client-tile'}>
        {failed ? (
          <span>{name}</span>
        ) : (
          <img src={`/images/${file}`} alt={`${name} logo`} loading="lazy" onError={() => setFailed(true)} />
        )}
      </div>
      {note && <figcaption>{note}</figcaption>}
    </figure>
  );
}

function useScrollReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

const stagger = (index: number): CSSProperties => ({ transitionDelay: `${Math.min(index, 6) * 70}ms` });

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [plantListStatus, setPlantListStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useScrollReveal();

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
        <div className="topline">
          <div className="container topline-inner">
            <span>Specialist rail and civil plant hire across Australia</span>
            <a href="tel:0450367695"><Phone size={14} /> 0450 367 695</a>
          </div>
        </div>
        <div className="container nav-wrap">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Damarc Civil home">
            <img src="/images/Outlook-image002.p_-_Damarc_Civil.png" alt="Damarc Civil" />
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#fleet" onClick={closeMenu}>Plant &amp; Equipment</a>
            <a href="#safety" onClick={closeMenu}>Safety</a>
            <a href="#gallery" onClick={closeMenu}>Gallery</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <a className="nav-cta" href="#enquiry" onClick={closeMenu}>Request a quote <ArrowRight size={16} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-image" />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <div className="hero-copy">
              <p className="eyebrow light"><span className="eyebrow-line" /> Damarc Civil Pty Ltd · Est. 2017</p>
              <h1>Specialist Rail<br /><em>and Civil</em> Plant Hire</h1>
              <p className="hero-lede">
                Compliant equipment, experienced operators and responsive end to end project management support for rail
                and civil infrastructure works across Australia.
              </p>
              <div className="hero-actions">
                <a className="button button-blue" href="#enquiry">Request a free quote <ArrowRight size={18} /></a>
                <a className="phone-link" href="tel:0450367695">
                  <span className="phone-circle"><Phone size={16} /></span> Call 0450 367 695
                </a>
              </div>
              <div className="hero-note"><Check size={15} /> Same-day and emergency enquiries available</div>
            </div>
            <ul className="hero-facts">
              {heroFacts.map((fact) => (
                <li key={fact.value}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <a className="scroll-cue" href="#about"><span>Scroll to explore</span><ChevronDown size={17} /></a>
        </section>

        <section className="trust-strip">
          <div className="container trust-inner">
            <p>Trusted project support for</p>
            <div className="approval-list">{approvals.slice(0, 5).map((approval) => <span key={approval}>{approval}</span>)}</div>
            <a href="#safety">Our compliance approach <ArrowRight size={15} /></a>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container about-grid">
            <div className="about-left">
              <div className="section-intro reveal">
                <p className="eyebrow">01 / About Damarc</p>
                <h2>Built for the work<br /><span>behind the work.</span></h2>
              </div>
              <figure className="about-visual reveal">
                <img
                  src={`${imageBase}Damarc_922_1_-_Damarc_Civil.jpeg`}
                  alt="Damarc Civil HiRail excavator and support fleet on a rail corridor"
                  loading="lazy"
                />
                <figcaption>
                  <strong>HiRail and civil plant</strong>
                  <span>Rail corridors, possessions and major civil works</span>
                </figcaption>
              </figure>
            </div>
            <div className="about-copy reveal">
              <p className="lead">
                Damarc Civil supplies compliant HiRail equipment, experienced RIW-competent operators, civil machinery,
                specialist attachments and labour for the projects that keep Australia moving.
              </p>
              <p>
                From overnight possessions to major infrastructure programs, we understand the pressure on every shift.
                Our role is to make sure the right people, plant and support arrive ready to perform.
              </p>
              <div className="director-note">
                <div className="director-icon"><Award size={21} /></div>
                <div>
                  <p className="eyebrow">A message from our director</p>
                  <p>
                    “Damarc Civil is led by major civil and infrastructure construction management experience. That gives
                    us a practical understanding of project pressures, safety, productivity, clear communication and
                    reliable delivery.”
                  </p>
                  <strong>Marc McCaffrey <span>Director</span></strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">02 / What we do</p>
                <h2>Ready for the<br /><span>critical path.</span></h2>
              </div>
              <p>One responsive team for the plant, people and practical know-how your project needs on site.</p>
            </div>
            <div className="service-grid">
              {services.map(({ icon: Icon, title, text }, index) => (
                <article className="service-card reveal" key={title} style={stagger(index)}>
                  <div className="service-number">0{index + 1}</div>
                  <Icon className="service-icon" size={26} strokeWidth={1.5} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a href="#fleet" aria-label={`See the plant and equipment for ${title}`}><ArrowRight size={17} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="fleet" className="section fleet-section">
          <div className="container">
            <div className="section-heading fleet-heading reveal">
              <div>
                <p className="eyebrow">03 / Plant &amp; equipment</p>
                <h2>Plant that performs<br /><span>when it matters.</span></h2>
              </div>
              <p>Our fleet is maintained, inspected and prepared for the demands of rail corridors, civil sites and major infrastructure.</p>
            </div>
            <div className="fleet-grid">
              {fleet.map((machine, index) => (
                <article className="fleet-card reveal" key={machine.name} style={stagger(index)}>
                  <div className="fleet-image">
                    <img src={machine.image} alt={`${machine.name} · ${machine.model}`} loading="lazy" />
                    <span>{machine.tag}</span>
                  </div>
                  <div className="fleet-info">
                    <h3>{machine.name}</h3>
                    <p className="fleet-model">{machine.model}</p>
                    <p>{machine.text}</p>
                    <a href="#enquiry">Enquire <ArrowRight size={15} /></a>
                  </div>
                </article>
              ))}
            </div>
            <div className="fleet-more reveal">
              <div>
                <p className="eyebrow">Support fleet</p>
                <p>Crew trucks, tippers, tool vans, work utes, trailers and support vehicles.</p>
              </div>
              <a className="button button-outline" href="#enquiry">Ask about availability <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="plant-list-section">
          <div className="container plant-list-card reveal">
            <div className="plant-list-copy">
              <p className="eyebrow">Fleet capability document</p>
              <h2>Download our<br /><span>Plant List.</span></h2>
              <p>See the full Damarc Civil fleet, support vehicles and specialist attachments in one concise capability document.</p>
              <div className="plant-list-meta">
                <span><Check size={15} /> HiRail plant</span>
                <span><Check size={15} /> Civil equipment</span>
                <span><Check size={15} /> Attachments</span>
              </div>
            </div>
            <div className="plant-list-form-wrap">
              {plantListStatus === 'sent' ? (
                <div className="plant-list-success">
                  <div className="success-icon"><Check size={22} /></div>
                  <h3>Your plant list is ready.</h3>
                  <p>The PDF download should have started automatically.</p>
                  <a className="button button-blue" href="/Damarc_Civil_Plant_List_v3_NAVY.pdf" download="Damarc_Civil_Plant_List_v3_NAVY.pdf">
                    Download again <Download size={17} />
                  </a>
                </div>
              ) : (
                <form className="plant-list-form" onSubmit={handlePlantListSubmit}>
                  <label>Name<input name="plant_list_name" required placeholder="Your name" /></label>
                  <label>Mobile<input name="plant_list_mobile" type="tel" required placeholder="Your mobile number" /></label>
                  <label>Email<input name="plant_list_email" type="email" required placeholder="you@company.com" /></label>
                  <button className="button button-dark" type="submit" disabled={plantListStatus === 'sending'}>
                    {plantListStatus === 'sending' ? 'Preparing download...' : 'Download plant list'} <Download size={17} />
                  </button>
                  {plantListStatus === 'error' && <p className="form-error">We couldn’t process that request. Please try again or call 0450 367 695.</p>}
                  <p className="form-footnote">Your details are only used to send the plant list and respond to your enquiry.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section id="safety" className="safety-section">
          <div className="container">
            <div className="safety-grid">
              <div className="safety-visual reveal">
                <img src={`${imageBase}922_5_-_Damarc_Civil.jpeg`} alt="Damarc Civil Liebherr 922 HiRail machinery ready for work" loading="lazy" />
                <div className="safety-badge"><ShieldCheck size={28} /><span>Safety<br /><strong>first</strong></span></div>
              </div>
              <div className="safety-copy reveal">
                <p className="eyebrow light">04 / Safety &amp; compliance</p>
                <h2>Confidence is<br /><em>built in.</em></h2>
                <p className="safety-lede">We take the details seriously, so your team can focus on delivering the project.</p>
                <div className="safety-points">
                  <div><ClipboardCheck size={19} /><span>Pre-start procedures, plant inspections and documented defect management.</span></div>
                  <div><HardHat size={19} /><span>Skilled, experienced and RIW-competent operators who understand rail environments.</span></div>
                  <div><Clock3 size={19} /><span>Reliable delivery and responsive support for planned and emergency works.</span></div>
                </div>
              </div>
            </div>
            <div className="client-band reveal">
              <div className="client-band-head">
                <p className="approval-label">Approvals, accreditations and project experience across</p>
                <span>Delivered for tier one contractors and rail authorities</span>
              </div>
              <div className="client-grid">
                {clients.map((client) => (
                  <ClientLogo key={client.name} name={client.name} file={client.file} note={client.note} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="capability" className="attachments-section">
          <div className="container">
            <div className="attachments-grid">
              <div className="reveal">
                <p className="eyebrow">05 / Specialist capability</p>
                <h2>The right tool<br /><span>for the task.</span></h2>
                <p>Our attachment range helps crews work safely and productively across changing site conditions.</p>
              </div>
              <div className="attachment-list reveal">
                {attachmentGroups.map((attachment) => <span key={attachment}><Check size={14} /> {attachment}</span>)}
              </div>
            </div>
            <div className="capability-closer reveal">
              <p><strong>If your project needs it, we can get it.</strong> Tell us the task and we will source the plant, attachment or crew to suit.</p>
              <a className="button button-dark" href="#enquiry">Talk to us about your project <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section id="gallery" className="section gallery-section">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">06 / In the field</p>
                <h2>Work ready.<br /><span>Site proven.</span></h2>
              </div>
              <p>A closer look at the machinery and people supporting rail and civil projects across the country.</p>
            </div>
            <div className="gallery-grid reveal">
              <div className="gallery-large">
                <img src={`${imageBase}922_2_-_Damarc_Civil.jpeg`} alt="Liebherr 922 HiRail excavators" loading="lazy" />
                <div className="gallery-caption">HiRail capability <span>01</span></div>
              </div>
              <div>
                <img src={`${imageBase}02-hitachi-zx135us.jpg`} alt="Hitachi ZX135US HiRail excavator" loading="lazy" />
                <div className="gallery-caption">Rail corridor works <span>02</span></div>
              </div>
              <div>
                <img src={`${imageBase}922_336_6_-_Damarc_Civil.jpeg`} alt="Caterpillar excavators on civil site" loading="lazy" />
                <div className="gallery-caption">Civil plant <span>03</span></div>
              </div>
              <div className="gallery-wide">
                <img src={`${imageBase}Damarc_922_1_-_Damarc_Civil.jpeg`} alt="HiRail excavator and support fleet" loading="lazy" />
                <div className="gallery-caption">Ready to mobilise <span>04</span></div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div className="reveal">
              <p className="eyebrow light">07 / Start a conversation</p>
              <h2>Let’s move<br /><em>your project</em><br />forward.</h2>
              <p className="contact-lede">Same-day and emergency enquiries are welcome. Talk to the people who understand the work.</p>
              <a className="contact-phone" href="tel:0450367695"><span><Phone size={18} /></span> 0450 367 695</a>
              <a className="contact-email" href="mailto:damarccivil@outlook.com">damarccivil@outlook.com <ArrowUpRightIcon /></a>
            </div>
            <div className="contact-details reveal">
              <div className="detail-row">
                <MapPin size={20} />
                <div>
                  <strong>Office</strong>
                  <p>Rosebery NSW 2018<br />Australia</p>
                </div>
              </div>
              <div className="detail-row">
                <ShieldCheck size={20} />
                <div>
                  <strong>Business details</strong>
                  <p>Damarc Civil Pty Ltd<br />ABN 11 605 631 534</p>
                </div>
              </div>
              <div className="detail-row">
                <Truck size={20} />
                <div>
                  <strong>Service area</strong>
                  <p>Australia wide</p>
                </div>
              </div>
              {socials.length > 0 && (
                <div className="detail-row">
                  <Linkedin size={20} />
                  <div>
                    <strong>Follow our work</strong>
                    <div className="social-row">
                      {socials.map(({ name, icon: Icon, url }) => (
                        <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={`Damarc Civil on ${name}`}>
                          <Icon size={17} /> {name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="enquiry" className="enquiry-section">
          <div className="container enquiry-grid">
            <div className="enquiry-copy reveal">
              <p className="eyebrow">08 / Project enquiry</p>
              <h2>Let’s get<br /><span>to work.</span></h2>
              <p>Tell us what you need and our team will come back to you promptly. Plant, operators, attachments or full project support.</p>
              <ul className="enquiry-points">
                <li><Check size={15} /> Same-day and emergency enquiries</li>
                <li><Check size={15} /> Free, no obligation quotes</li>
                <li><Check size={15} /> Rail and civil projects Australia wide</li>
              </ul>
              <a className="enquiry-phone" href="tel:0450367695"><Phone size={16} /> Prefer to talk? 0450 367 695</a>
            </div>
            <div className="quote-card reveal">
              <div className="quote-card-head">
                <div>
                  <p className="eyebrow">Project enquiry</p>
                  <h2>Send us the details.</h2>
                </div>
                <div className="card-mark"><ArrowRight size={18} /></div>
              </div>
              <p className="form-intro">Tell us what you need and our team will come back to you promptly.</p>
              {formStatus === 'sent' ? (
                <div className="form-message success">
                  <Check size={24} />
                  <h3>Thanks, we’ve got it.</h3>
                  <p>Your enquiry has been sent. Marc will be in touch shortly.</p>
                  <button className="text-button" onClick={() => setFormStatus('idle')}>Send another enquiry <ArrowRight size={15} /></button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="quote-form">
                  <div className="form-grid">
                    <label>Name<input name="name" required placeholder="Your name" /></label>
                    <label>Phone<input name="phone" type="tel" required placeholder="Your phone number" /></label>
                  </div>
                  <label>Email<input name="email" type="email" required placeholder="you@company.com" /></label>
                  <label>How can we help?<textarea name="message" required rows={4} placeholder="Tell us about your project, equipment or dates..." /></label>
                  <button className="button button-dark form-submit" type="submit" disabled={formStatus === 'sending'}>
                    {formStatus === 'sending' ? 'Sending enquiry...' : 'Send enquiry'} <ArrowRight size={17} />
                  </button>
                  {formStatus === 'error' && <p className="form-error">Something went wrong. Please call us on 0450 367 695.</p>}
                  <p className="form-footnote">Your details are only used to respond to your enquiry.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <a className="brand footer-brand" href="#home"><img src="/images/Outlook-image002.p_-_Damarc_Civil.png" alt="Damarc Civil" /></a>
          <p>Specialist rail and civil plant hire<br />for the work that keeps Australia moving.</p>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#services">Services</a>
            <a href="#fleet">Fleet</a>
            <a href="#safety">Safety</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="footer-quote" href="#enquiry">Request a free quote <ArrowRight size={16} /></a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Damarc Civil Pty Ltd. All rights reserved.</span>
          <a href="https://www.itscold.com.au" target="_blank" rel="noreferrer">Website by Go Polar <ArrowUpRightIcon /></a>
        </div>
      </footer>
    </div>
  );
}

function ArrowUpRightIcon() { return <ArrowRight size={15} className="arrow-up" />; }

export default App;
