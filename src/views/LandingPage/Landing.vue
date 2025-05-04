<template>
  <v-app>
    <v-app-bar app fixed color="white" elevate-on-scroll flat>
      <v-container>
        <v-row class="align-center">
          <v-col cols="2" class="d-flex justify-start">
            <v-img src="/images/AgriVistaLogo.png" height="50" contain></v-img>
          </v-col>

          <v-col class="d-none d-md-flex justify-end">
            <v-btn 
              text 
              href="#hero-section" 
              class="mx-2 nav-btn" 
              :class="{'active-btn': activeLink === 'home'}" 
              style="font-size: 16px; padding: 10px 16px;"
              @click="setActiveLink('home')"
            >Home</v-btn>

            <v-btn 
              text 
              href="#about-section" 
              class="mx-2 nav-btn" 
              :class="{'active-btn': activeLink === 'about'}" 
              style="font-size: 16px; padding: 10px 16px;"
              @click="setActiveLink('about')"
            >About Us</v-btn>

            <v-btn 
              text 
              href="#explore-section" 
              class="mx-2 nav-btn" 
              :class="{'active-btn': activeLink === 'explore'}" 
              style="font-size: 16px; padding: 10px 16px;"
              @click="setActiveLink('explore')"
            >What We Offer</v-btn>

            <v-btn 
              text 
              to="/login" 
              class="mx-2 nav-btn" 
              style="font-size: 16px; padding: 10px 16px;"
            >Login</v-btn>
          </v-col>

          <!-- Mobile Navigation Menu -->
          <v-col class="d-flex d-md-none justify-end">
            <v-btn icon @click="drawer = !drawer">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
        <v-list-item>
          <v-list-item-title><v-btn text href="#hero-section" @click="setActiveLink('home')">Home</v-btn></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-btn text href="#about-section" @click="setActiveLink('about')">About Us</v-btn></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-btn text href="#explore-section" @click="setActiveLink('explore')">What We Offer</v-btn></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-btn text to="/login">Login</v-btn></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid class="pa-0">
        <div id="hero-section" class="hero-section d-flex flex-column justify-center align-center text-center white--text">
          <div class="move-up" style="padding-bottom:100px;">
            <h1 class="text-h4 text-md-h3 text-white font-weight-bold mb-9">
              Preserving urban Agriculture<br>Surrounded by Community
            </h1>
            <v-btn color="green" to="/login" dark>
              Explore Farms <v-icon end>mdi-magnify</v-icon>
            </v-btn>
          </div>
        </div>

        <section id="about-section" class="fullpage-section1">
          <v-container class="about-section">
            <v-row>
              <v-col cols="12" md="7">
                <h1 class="font-weight-bold mb-4" style="padding-top: 150px;">ABOUT US</h1>
                <h3 class="font-weight-medium mb-4">Bridging Nature and Urban Life in Butuan City</h3>
                <p>
                  In the heart of Butuan City, urban farms offer a peaceful retreat from the fast-paced city life.
                  However, many of these farms remain undiscovered due to a lack of promotion and awareness.
                </p>
                <p class="mt-4 mb-6">
                  Our platform serves as a bridge between travelers and urban farms, making it easier to discover, explore,
                  and experience the serenity of farm life within the city. Through our centralized digital platform,
                  we connect visitors with local urban farms, providing information, booking options,
                  and curated experiences to enhance your journey.
                </p>
                <v-btn color="green" to="/login" dark class="mt-4">Learn More</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </section>

        <section id="explore-section" class="fullpage-section2">
          <v-container class="explore-section text-white fill-height d-flex flex-column justify-center align-center text-center white--text">
            <div>
              <h2 class="font-weight-bold mb-9" style="padding-top: 180px;">
                DISCOVER, EXPLORE, AND EXPERIENCE <br> URBAN FARMS
              </h2>
              <p>
                Escape the hustle of city life and immerse yourself in Butuan City's hidden green <br> sanctuaries.
                Whether you're seeking relaxation, learning opportunities, or hands-on farm <br> activities,
                our platform connects you with the best urban farms in the city.
              </p>
            </div>
          </v-container>
        </section>

        <section class="fullpage-section">
          <v-container class="py-12 fill-height d-flex align-center">
            <v-row>
              <v-col cols="12" md="3" v-for="(card, i) in cards" :key="i">
                <v-card elevation="2">
                  <v-img :src="card.image" height="160px" cover></v-img>
                  <v-card-title class="font-weight-bold">{{ card.title }}</v-card-title>
                  <v-card-text class="text-body-2">{{ card.description }}</v-card-text>
                  <v-card-actions>
                    <v-btn color="green" text>Learn More</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </section>

        <v-footer class="pa-8 grey lighten-4">
          <v-container>
            <v-row>
              <v-col cols="12" md="3">
                <v-img src="/images/AgriVistaLogo.png" height="100"></v-img>
              </v-col>
              <v-col cols="12" md="3">
                <h4 class="font-weight-bold mb-3">Our links</h4>
                <ul class="footer-links">
                  <li><a href="#hero-section">Home</a></li>
                  <li><a href="#about-section">About Us</a></li>
                  <li><a href="#explore-section">What we Offer</a></li>
                  <li><a href="/login">Learn More</a></li>
                </ul>
              </v-col>
              <v-col cols="12" md="6">
                <h4 class="font-weight-bold mb-3">Newsletters</h4>
                <div class="d-flex">
                  <v-text-field label="Your email" dense hide-details outlined></v-text-field>
                  <v-btn color="success" class="ml-2" dark>Send</v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const cards = [
  {
    title: 'Urban Farm Listings',
    image: '/images/banwa.jpg',
    description: 'Explore a curated selection of verified urban farms in Butuan City.'
  },
  {
    title: 'Farm Activities',
    image: '/images/222.jpg',
    description: 'Participate in organic farming workshops, guided tours, and more.'
  },
  {
    title: 'Booking & Reservation',
    image: '/images/333.jpg',
    description: 'Easily book farm visits and accommodations through our platform.'
  },
  {
    title: 'Community Extension',
    image: '/images/444.jpg',
    description: 'Participate to help sustain urban farms and support local communities.'
  }
];

let drawer = ref(false);
const activeLink = ref('home');  

const setActiveLink = (link) => {
  activeLink.value = link;
};

const updateActiveLinkOnScroll = () => {
  const sections = ['hero-section', 'about-section', 'explore-section'];
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section && isInViewport(section)) {
      activeLink.value = sectionId.split('-')[0];
    }
  });
};

const isInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
};

onMounted(() => {
  window.addEventListener('scroll', updateActiveLinkOnScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateActiveLinkOnScroll);
});
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}

.hero-section {
  background-image: url('/src/assets/landing.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding-top: 80px;
}

.move-up {
  transform: translateY(-20px);
}

.fullpage-section {
  min-height: 50vh;
}

.fullpage-section1 {
  min-height: 100vh;
  background-image: url('/public/images/aboutbg.png');
  background-size: cover;
  background-position: center;
}

.fullpage-section2 {
  min-height: 100vh;
  background-image:
    linear-gradient(to bottom, rgba(66, 168, 79, 0.6), rgba(210, 242, 214, 0.6)),
    url('/src/assets/Discoverybg.jpg');
  background-size: cover;
  background-position: center;
}

.about-section {
  color: white;
  font-size: 1.4rem;
}

.explore-section {
  background-image: url('/images/explore.jpg');
  background-size: cover;
  background-position: center;
  padding: 100px 0;
  font-size: 1.8rem;
}

.nav-btn {
  transition: background-color 0.3s ease;
}

.active-btn {
  background-color: green !important;
  color: white !important;
}

@media (max-width: 600px) {
  .hero-section, .about-section {
    padding-top: 50px;
  }
}

.v-btn:hover {
  background-color: green !important;
  color: white !important;
}
</style>
