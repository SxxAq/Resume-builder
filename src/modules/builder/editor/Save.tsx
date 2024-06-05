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
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../../firebase'; // Adjust the path to your Firebase configuration
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
      // Use user's email as the document ID
      const userEmail = resumeData.basics.email;

      // Check if a document with the same email exists
      const q = query(collection(db, 'resumes'), where('basics.email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Document exists, update it
        const docRef = querySnapshot.docs[0].ref;
        await setDoc(docRef, resumeData, { merge: true });
        console.log('Document updated with ID: ', docRef.id);
        toast.success('Document updated successfully!');
      } else {
        // Document does not exist, create a new one
        const docRef = doc(collection(db, 'resumes'), userEmail);
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
        className="bg-[#10b981] text-white px-8"
        variant="contained"
        onClick={saveDataToFirestore}
      >
        Save
      </Button>
    </>
  );
};

export default SaveToFirestoreButton;
