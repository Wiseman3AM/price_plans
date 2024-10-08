document.addEventListener('alpine:init', () => {
    Alpine.data('functions', () => {
        return {

            priceData: [],
            selectedPriceData: [],
            selectedPlanName: '',
            AddedPlan: [],
            planName: '',
            smsPrice:'',
            callPrice: '',
            dataPrice: '',
            usage: '',
            airtime: '',
            totalBill: '',
            remainingAirtime: '',
            searched: false,
            searchPopUp: false,
            calculated: false,
            updatePopUp:false,
            add: false,
            edit: false,
            look: false,
            remove: false,



            async fetchAddPricePlan (){
                try{
                   const response = await axios.post(`/totalBill/price_plan/Add_price_plan`, 
                    {
                        plan_name: this.planName,
                        sms_price: this.smsPrice,
                        call_price: this.callPrice,
                        data_price: this.dataPrice,
                    })
                } catch (error){
                    console.log('Error adding a plan:', error)
                }
            },


            async addPlan() {
                this.AddedPlan = await this.fetchAddPricePlan();
                console.log('Added plan:', this.AddedPlan)
                this.loadPricePlans()
            },


            async fetchPricePlans() {
                try {
                    const response = await axios.get(`/totalBill/price_plan/Retrieve/all/price_plans`);
                    return response.data;

                } catch (error) {
                    console.error('Error fetching price plans:', error);
                    return [{"Message" : 'No data'}]
                };
                

            },

        async  loadPricePlans() {
               this.priceData = await this.fetchPricePlans();
                console.log('Price plans', this.priceData)
            },

            async fetchOnePricePlan(){
                try{
                    const response = await axios.get(`/totalBill/price_plan/Retrieve/one/price_plan/${this.selectedPlanName}`);
                    return response.data;

                } catch (error){
                    console.log('Error retieving one price plan:', error);
                    return [{"Message" : 'No data'}]
                }
            },

                async loadSearchedPlan(){
                    this.selectedPriceData = await this.fetchOnePricePlan();
                    console.log('Selected plan', this.selectedPriceData)
                    this.loadPricePlans();
                },


            async fetchEditPricePlan (){
                try {
                    const response = await axios.put(`/totalBill/price_plan/Update_plan/${this.selectedPlanName}`,
                        {
                            new_plan_name: this.planName,
                            sms_price: this.smsPrice,
                            call_price: this.callPrice,
                            data_price: this.dataPrice,
                        }
                    );
                    return response.data;
                    
                } catch (error){
                    console.error('Error updating price plan: ', error)
                    return null;
                }
            },

            async loadEditedPlan (){
                const editedPlan =  await this.fetchEditPricePlan();
                console.log('Edited Plan', editedPlan);
                this.loadPricePlans()
            },


            async fetchDeletePricePlan (){
                try{

                    const response = await axios.delete(`/totalBill/price_plan/Delete_plan/${this.selectedPlanName}`);
                    return response.data;

                } catch (error){
                    console.error('Error deleting price plan', error)
                }
            },

            async deleteSelectedPlan(){
            const deletePlan = await this.fetchDeletePricePlan();
            console.log('Deleted Plan', deletePlan);
            this.loadPricePlans();
            },

            async fetchTotalBill(){
                try{
                    const response = await axios.post(`/totalBill/price_plan/Calculate_Total_price/${this.selectedPlanName}`,
                        {usage: this.usage}
                    );
                    return response.data
                } catch (error){
                    console.log('Error fetching total phone bill API:', error);
                    return null
                    
                }
            },

            async calculateTotalBill(){
                this.totalBill = await this.fetchTotalBill();
                console.log('Total bill:', this.totalBill)
            },


    async fetchEnoughAirtime(){
                try{
                    const response = await axios.post(` /totalBill/price_plan/Calculate_enough_price/${this.selectedPlanName}`,
                        {usage: this.usage,
                        airtime: this.airtime
                        }
                    );
                    return response.data
                } catch (error){
                    console.log('Error fetching total phone bill API:', error);
                    return null
                    
                }
            },

            async calculateAirtime(){
                this.remainingAirtime = await this.fetchEnoughAirtime();
                console.log("Remaining airtime:", this.remainingAirtime)
            },




        }
    });
});


        