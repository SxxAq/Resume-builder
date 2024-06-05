import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase'; // Adjust the path to your Firebase configuration
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useBasicDetails } from 'src/stores/basic';
import { useExperiences } from 'src/stores/experience';
import { useEducations } from 'src/stores/education';
import { useAwards } from 'src/stores/awards';
import { useVoluteeringStore } from 'src/stores/volunteering';
import { useActivity } from 'src/stores/activity';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';

const ImportFromFirestoreButton = () => {
  const importDataFromFirestore = useCallback(async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        toast.error('No user is currently logged in.');
        return;
      }

      const userUid = user.uid;
      const docRef = doc(db, 'resumes', userUid);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const resumeData = docSnapshot.data();
        const {
          basics = {},
          skills = {},
          work = [],
          education = [],
          activities = {
            involvements: '',
            achievements: '',
          },
          volunteer = [],
          awards = [],
        } = resumeData;
        const {
          languages = [],
          frameworks = [],
          libraries = [],
          databases = [],
          technologies = [],
          practices = [],
          tools = [],
        } = skills;

        useBasicDetails.getState().reset(basics);
        useLanguages.getState().reset(languages);
        useFrameworks.getState().reset(frameworks);
        useLibraries.getState().reset(libraries);
        useDatabases.getState().reset(databases);
        useTechnologies.getState().reset(technologies);
        usePractices.getState().reset(practices);
        useTools.getState().reset(tools);
        useExperiences.getState().reset(work);
        useEducations.getState().reset(education);
        useVoluteeringStore.getState().reset(volunteer);
        useAwards.getState().reset(awards);
        useActivity.getState().reset(activities);

        toast.success('Resume data was successfully imported from Firestore.');
      } else {
        toast.error('No saved resume data available in Firestore.');
      }
    } catch (e) {
      console.error('Error importing document: ', e);
      if (e instanceof Error) {
        toast.error('Error importing document: ' + e.message);
      } else {
        toast.error('Error importing document: ' + JSON.stringify(e));
      }
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Button
        className="bg-white text-[#111827] px-8"
        variant="outlined"
        onClick={importDataFromFirestore}
      >
        Import Save
      </Button>
    </>
  );
};

export default ImportFromFirestoreButton;
