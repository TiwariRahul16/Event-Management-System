"use server";

export async function submitForm(prevState, formData) {

   try {
      const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

   const data = await response.json();
   return data;

  } catch (e) {
    throw new Error('Failed to create task');
  }

}
