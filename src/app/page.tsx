"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <main className="container mx-auto">
        <section className="hero">
          <img src="/pizza-dao.gif" alt="Detroit Bitcoin Pizza Day Logo" />
          <h1>
            DETROIT
            <br />
            BITCOIN PIZZA
            <br />
            DAY
          </h1>
          <div className="year">2025</div>
          <p className="subtext">
            The Detroit edition of PizzaDAO’s Global Bitcoin Pizza Party joins
            forces with Art Night for an unforgettable evening of pizza, music,
            and interactive art!
          </p>
        </section>

        <section>
          <h2 className="alternate">
            Celebrating Bitcoin, Art, Music, and Community in Detroit
          </h2>
          <p>
            Detroit proudly joins the{" "}
            <strong>Global Bitcoin Pizza Party</strong>, an international
            celebration organized by <strong>PizzaDAO</strong> to commemorate
            the first real-world cryptocurrency transaction.
          </p>
          <p>
            In 2010, Laszlo Hanyecz made history by purchasing two pizzas for
            10,000 BTC—the first real-world use of Bitcoin. Today, this event
            spans 100+ cities, uniting crypto communities, supporting local
            pizzerias, and promoting decentralized technology.
          </p>
          <p className="mt-4">
            <strong>Learn more:</strong>{" "}
            <a href="https://globalpizzaparty.xyz" target="_blank">
              GlobalPizzaParty.xyz
            </a>
          </p>
        </section>

        <section>
          {/* <p className="date">Thursday, May 22nd</p> */}
          <h2 className="alternate">Detroit PizzaDAO’s Global Pizza Party</h2>
          <ul className="pills">
            <li>
              <div className="pill">
                <strong>ART NIGHT DETROIT</strong>
              </div>
              <p>
                Creating a community of creative people to come together for the
                sake of art since 2018.
              </p>
            </li>
            <li>
              <div className="pill alternate">
                <strong>
                  Detroit Bitcoin Pizza
                  <br />
                  Day Scavenger Hunt
                </strong>
              </div>
              <p>
                A multi-day scavenger hunt celebrating the intersection of
                music, technology, and culture
              </p>
            </li>
            <li>
              <div className="pill">
                <strong>
                  MOVEMENT
                  <br />
                  Kickoff Party
                </strong>
              </div>
              <p>
                <strong>Official Movement 2025 kickoff party</strong>
              </p>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="alternate">Pizza Box Art Contest</h2>
          <p>
            Submit your digital pizza box artwork for a chance to get your
            design printed on pizza boxes for the Detroit PizzaDAO&apos;s Global
            Pizza Party!
          </p>
          <p>
            <strong>Deadline:</strong> April 1st
          </p>
          <div className="cta">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdHDq0XOozG8TbZHztm9tsUa2YZfRW1XQM2OFC1GPRId5hYiA/viewform?usp=header"
              target="_blank"
            >
              SUBMIT
            </a>
          </div>
        </section>

        <section>
          <h2 className="alternate">What&apos;s Happening?</h2>
          <ul>
            <li>
              Launch of{" "}
              <strong>Detroit Bitcoin Pizza Day Scavenger Hunt</strong> – Grab
              an exclusive Pizza POAP (Proof of Attendance Protocol) to start
              your adventure!
            </li>
            <li>Live DJs, immersive art, and activations</li>
            <li>Exclusive sponsor swag & surprise giveaways</li>
            <li>
              <strong>VIP Experience (6 PM):</strong> Hosted appetizers,
              specialty pizzas, drinks, & VIP swag bag.
            </li>
            <li>
              <strong>General Admission (7 PM - 1 AM):</strong> DJs, live art,
              pizzas, & Pizza Art Contest.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="alternate">
            Scavenger Hunt
            <br />
            <span className="subtext">May 23rd to May 26th</span>
          </h2>
          <p>
            Participants can boost their <strong>Pizza Pursuit score</strong>{" "}
            by:
          </p>
          <ul>
            <li>Completing festival-exclusive challenges.</li>
            <li>Visiting sponsor activations for surprise rewards.</li>
            <li>Engaging in crypto-powered art and music experiences.</li>
          </ul>
          <p>
            The celebration connects with <strong>Movement Festival</strong>{" "}
            (May 24-26), one of the world&apos;s premier electronic music
            events, drawing thousands of music and tech enthusiasts.
          </p>

          <h3 className="subtext mb-4">Participating Pizza Locations</h3>
          {/* <ul>
            <li>Michigan & Trumbull Pizza</li>
            <li>Supino&apos;s Pizzeria</li>
            <li>Pie Sci Pizza</li>
            <li>Grandma Bob&apos;s Pizza</li>
            <li>Buddy&apos;s Pizza</li>
            <li>Mootz Pizzeria + Bar</li>
          </ul> */}
          <Image className="m-auto" src="/pizza-map.jpg" alt="Pizza Locations" width={600} height={600} />

          <h3 className="subtext">How It Works</h3>
          <ul>
            <li>
              <div className="subheading">Register & Check-In</div>
              <div>
                Join the launch party at Lincoln Street Art Park on May 22 or
                register online.
              </div>
            </li>
            <li>
              <div className="subheading">Scavenger Hunt Challenges</div>
              <div>
                Visit five participating pizza spots by May 26th & tap the
                PizzaDAO mascot to collect POAPs.
              </div>
            </li>
            <li>
              <div className="subheading">Social Media Engagement</div>
              <div>
                Post progress on X (@pizzadao) or share POAP Moments to win
                Social Ambassador Prizes.
              </div>
            </li>
          </ul>

          <h3 className="subtext">Prizes</h3>
          <ul>
            <li>
              <div className="subheading">Grand Prize</div>
              <div>Free Pizza for a Year!</div>
            </li>
            <li>
              <div className="subheading">Mini Prizes</div>
              <div>NFTs, crypto rewards, festival VIP tickets, and more.</div>
            </li>
          </ul>
        </section>

        <section className="sponsor-section flex flex-col gap-4">
          <div>
            <h2 className="alternate">Why Sponsor?</h2>
            <div>
              <p className="subtext">
                Detroit Bitcoin Pizza Day is a high-impact brand activation
                opportunity where sponsors gain:
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="feature-grid">
              <div className="feature-box alternate">
                Exposure to Detroit&apos;s Web3, art, and music audience.
              </div>
              <div className="feature-box alternate">
                Celebration of Bitcoin Pizza Day through collaboration with
                Detroit pizzerias.
              </div>
              <div className="feature-box alternate">
                Custom brand activations to showcase innovation.
              </div>
              <div className="feature-box alternate">
                Visibility across 100+ cities through PizzaDAO&apos;s global
                campaign.
              </div>
            </div>
            <div className="feature-box alternate">
              Pre-Party for Detroit&apos;s Movement Festival weekend <br />{" "}
              (approx. attendance: 100,000 from around the world).
            </div>
          </div>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeuKP2xd8c26Rm0T1UI7Jn-p99aQiOslnMP3ln-JCk-PeFUhQ/viewform?usp=header"
            target="_blank"
          >
            <div className="cta">APPLY TO SPONSOR</div>
          </a>
        </section>
      </main>
      <footer className="max-w-[900px] mx-auto p-6 flex gap-[24px] flex-wrap items-center justify-center text-[#d9534f]">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://builddetroit.xyz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="Detroit icon"
            width={16}
            height={16}
          />
          Built in Detroit
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://bitcoin.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Bitcoin icon"
            width={16}
            height={16}
          />
          Bitcoin
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://en.wikipedia.org/wiki/Bitcoin_pizza_transaction"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Pizza icon"
            width={16}
            height={16}
          />
          Pizza Day →
        </a>
      </footer>
    </div>
  );
}
