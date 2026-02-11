import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as Sentry from "@sentry/react";

export const submitTemoignage = createAsyncThunk(
  'temoignage/submit',
  async (payload, { rejectWithValue }) => {
    try {
      const { formData, selectedFile } = payload;
      const baseUrl = "http://localhost:8055";
      
      let fileId = null;

      // --- 1. UPLOAD DU FICHIER ---
      if (selectedFile) {
        const dataForFile = new FormData();
        dataForFile.append('file', selectedFile); 
        
        // ICI : On utilise le champ 'title' pour stocker l'info du témoin
        // Le champ 'uploaded_by' est réservé aux ID utilisateurs système
        dataForFile.append('title', `${formData.nom} ${formData.prenom}`);
        dataForFile.append('description', `Fichier téléversé par le témoin : ${formData.nom} ${formData.prenom}`);

        const resFile = await fetch(`${baseUrl}/files`, {
          method: "POST",
          body: dataForFile, 
        });

        if (!resFile.ok) {
           const errText = await resFile.text();
           throw new Error(`Erreur Upload Fichier: ${errText}`);
        }

        const jsonFile = await resFile.json();
        fileId = jsonFile.data.id; 
      }

      // --- 2. CRÉATION DU TÉMOIN ---
      const resTemoin = await fetch(`${baseUrl}/items/temoin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          telephone: formData.telephone,
        }),
      });
      
      if (!resTemoin.ok) throw new Error("Erreur Création Témoin");
      // On récupère les données si besoin, mais ici on continue
      await resTemoin.json(); 

      // --- 3. CRÉATION DE LA VICTIME ---
      const resVictime = await fetch(`${baseUrl}/items/victime`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: formData.victimeNom,
          prenom: formData.victimePrenom,
          date_naissance: formData.victimeDateNaissance || null,
          histoire: formData.histoire,
          // On lie le fichier ici. Assure-toi d'avoir créé la colonne 'piece_jointe' dans 'victime'
          piece_jointe: fileId, 
        }),
      });

      if (!resVictime.ok) throw new Error("Erreur Création Victime");
      const { data: victime } = await resVictime.json();

      return victime;

    } catch (error) {
      console.error("Détail:", error);
      Sentry.captureException(error);
      return rejectWithValue(error.message);
    }
  }
);

const temoignageSlice = createSlice({
  name: 'temoignage',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitTemoignage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitTemoignage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitTemoignage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = temoignageSlice.actions;
export default temoignageSlice.reducer;