import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
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
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase'; // Adjust the path to your Firebase configuration
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SaveToFirestoreButton = () => {
  const saveDataToFirestore = useCallback(async () => {
    const resumeData = {
      basics: useBasicDetails.getState().values,
      work: useExperiences.getState().experiences,
      education: useEducations.getState().academics,
      awards: useAwards.getState().awards,
      volunteer: useVoluteeringStore.getState().volunteeredExps,
      skills: {
        languages: useLanguages.getState().get(),
        frameworks: useFrameworks.getState().get(),
        technologies: useTechnologies.getState().get(),
        libraries: useLibraries.getState().get(),
        databases: useDatabases.getState().get(),
        practices: usePractices.getState().get(),
        tools: useTools.getState().get(),
      },
      activities: useActivity.getState().activities,
    };

    try {
      const user = auth.currentUser;

      if (!user) {
        toast.error('No user is currently logged in.');
        return;
      }

      const userUid = user.uid;
      const docRef = doc(collection(db, 'resumes'), userUid);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        // Document exists, update it
        await setDoc(docRef, resumeData, { merge: true });
        console.log('Document updated with ID: ', docRef.id);
        toast.success('Document updated successfully!');
      } else {
        // Document does not exist, create a new one
        await setDoc(docRef, resumeData);
        console.log('Document written with ID: ', docRef.id);
        toast.success('Document created successfully!');
      }
    } catch (e) {
      console.error('Error adding or updating document: ', e);
      toast.error('Error saving document: ' + e.message);
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <Button
        className="bg-[#10b981] text-white flex-1 px-10"
        variant="contained"
        onClick={saveDataToFirestore}
      >
        Save
      </Button>
    </>
  );
};

export default SaveToFirestoreButton;
