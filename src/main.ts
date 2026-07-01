import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura'

import './style.css'
import 'primeicons/primeicons.css';

import App from './App.vue'

const app = createApp(App);

const MyPreset = definePreset(Aura, {
  //Your customizations, see the following sections for examples
  components: {
    // popover: {
    //   root: {
    //     background: '#CCC',
    //     borderColor: 'none'
    //   },
    // },
    card: {
      root: {
        color: '#FFFFFF',
        background: '#3795F5',
      },
      title: {
        fontSize: '16px',
      },
      body: {
        // padding: '10px'
      },
      // background: 'bg-slate-900/40'
    },
    tag: {
      // paddingX: '0.5rem',
      // paddingY: '0.25rem',
      root: {
        padding: '4px 8px',
        fontSize: '0.8rem',
      }
    },
    // button: {
    //   paddingX: '0.5rem',
    // }
  },
  semantic: {
    green: {
      100: '#ecfdf5',
      700: '#059669',
    },
    success: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981', // 👈 color principal
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b'
    },
    rarity: {
      common: '#40464E',
      gold: '#E2AC08',
      gummy: '#C02649',
      galaxy: '#4A2956'
    },
    // primary: {
    //     50: '{indigo.50}',
    //     100: '{indigo.100}',
    //     200: '{indigo.200}',
    //     300: '{indigo.300}',
    //     400: '{indigo.400}',
    //     500: '{indigo.500}',
    //     600: '{indigo.600}',
    //     700: '{indigo.700}',
    //     800: '{indigo.800}',
    //     900: '{indigo.900}',
    //     950: '{indigo.950}'
    // },
    // semantic: {
    //   rarity: {
    //     common: '#40464E',
    //     gold: '#E2AC08',
    //     gummy: '#C02649',
    //     galaxy: '#4A2956'
    //   }
    // },
    colorScheme: {
      light: {

      },
      dark: {

      }
    }
  }
});

app.use(PrimeVue, {
  license: 'eyJpZCI6IjIzNjFlZjVjLWRhMTEtNDk0OS05NDg4LTIxODcwMGRjZDc4YiIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODI5MDc0ODgsImV4cCI6MTgxNDQ0MzQ4OH0.cZILfuJ43uvw1F59Hpf717UCHS5uVQr5R1D-PXKt5QL7-FNhxtbf2wysrSVfZlbhuj40sdTAC4uYTAYqEDPcBg',
  theme: {
    preset: MyPreset,
    options: {
      // darkModeSelector: 'system',
      darkModeSelector: '.my-app-dark',
      // cssLayer: {
      //         name: 'primevue',
      //         order: 'theme, base, primevue'
      //     }
    }
  }
});
app.use(ToastService);
app.mount('#app');