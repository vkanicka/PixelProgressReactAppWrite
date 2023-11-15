import Button from './Button'
import { Client, Databases, ID } from "appwrite";


const TestCreate = () => {

    
    const testCreate = () => {
        const client = new Client()
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('6525e68e64daf6c98165');
    
        const databases = new Databases(client);
    
        const promise = databases.createDocument(
            '655257ba4cfedb189baa',
            '65525b02ba34cfbfa809',
            ID.unique(),
            {
                "name": "potato",
                "days": ["Monday"],
                "steps": ["start"],
                "week_start_dates": ["2023-10-01T09:00:00.000+00:00"],
                "user_id": "65524ca85db9df5ea2c4"
            }
        );
    
        promise.then(function (response) {
            console.log(response);
        }, function (error) {
            console.log(error);
        });
    }

    return (
        <Button fx={testCreate} text={'Test Create'} />
    )
} 

export default TestCreate;