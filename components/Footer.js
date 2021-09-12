import Head from "next/head";

export default function Footer() {
  return (
    <>
      <div className="flex justify-center bg-gray-100">
        <footer class="bg-light text-center text-lg-start">
          <div class="container p-4">
            <div class="row">
              <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                <h5 class=" text-2xl font-semibold">
                  Grand Central Bank of America
                </h5>
                <br />

                <p>
                  At Grand Central Bank of America, we’re committed to
                  cultivating a diverse and inclusive workplace and focusing on
                  partnerships that drive change and address critical challenges
                  facing our communities. Creating an inclusive environment
                  starts at the top and extends to all of our company. Our
                  Board, its committees and our CEO play a key role in the
                  oversight of our culture, holding management accountable for
                  ethical and professional conduct and a commitment to being a
                  diverse and inclusive workplace.
                </p>
              </div>

              <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                <h5 class=" text-2xl font-semibold">Making an Impact</h5>
                <br />
                <p>
                  Since 2007, our Environmental Business Initiative has helped
                  finance sustainable business activities all across the globe.
                  Our commitment provides financial and intellectual capital to
                  develop solutions to climate change and other environmental
                  challenges. We focus on low-carbon energy, energy efficiency,
                  and sustainable transportation, in addition to addressing
                  water conservation, land use, and more.
                </p>
              </div>
            </div>
          </div>

          <div class="text-center p-3">
            © 2021 Copyright:
            <a class="text-dark" href="#">
              gcb-of-america.com
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
