import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate,useParams } from 'react-router-dom';
import AxiosService from './utils/ApiService';
import { useFormik } from 'formik';
import * as Yup from 'yup'

function Edituser() {

    let params = useParams()
    let [initialValues,setinitialValues] = useState({
    Books:{
        title:"",
        author:"",
        ISBNnumber:"",
        publicationDate:""
     },
     Author:{
        authorsname:"",
        birthdate:"",
        shortbio:"",
     }
    });
   
    const getUserData = async () => {
        let {id} = params;
        try {
          let res=await AxiosService.get(`/Books/${id}`);
          if (res.status ===200) {
            setinitialValues({
               Books:{
                    title:res.data.title,
                    author:res.data.author,
                    ISBNnumber:res.data.ISBNnumber,
                    publicationDate:res.data.publicationDate
                },
                Author:{
                    authorsname:res.data.Author.authorsname,
                    birthdate:res.data.Author.birthdate,
                    shortbio:res.data.Author.shortbio
                }})
          }
        }
        catch(error){
            console.log(error);
        }

    };
  
    let navigate = useNavigate()


 let formik=useFormik({
    initialValues:initialValues,

validationSchema:Yup.object({

       Books: Yup.object({
            title:Yup.string().required('Title is Required'),
            author:Yup.string().required('author is Required'),
            ISBNnumber:Yup.string().required('ISBN number required').matches(/^\d{13}$/,'Enter a valid ISBN No'),
            publicationDate:Yup.date().max('2024-01-10','select lesser than current date')
        }),

        Author:Yup.object({
            authorsname:Yup.string().required('Authorsname is Required'),
            birthdate:Yup.date().max('2024-01-10','select lesser than current date'),
            shortbio:Yup.string().required('Enter a biography')
        })
          }),
enableReinitialize: true,
          onSubmit:async(values) => {
            let {id}=params;
            values.id=id;
            try {
              let res=await AxiosService.put(`/Books/${id}`,values);
              if (res.status===200) navigate("/dashboard");
            } catch (error) {
              console.log(error);
            }
          },

          
    });

  
useEffect(()=>{getUserData()},[])


    
      return <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
            <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Edit User</h1>
                    </div>
            <Form onSubmit={formik.handleSubmit}>

              <Form.Group className="mb-3" >
                <Form.Label>Books</Form.Label>

                <Form.Control type="text" placeholder="Title" id="title" name="Books.title" onChange={formik.handleChange} value={formik.values.title} onBlur={formik.handleBlur}/>
                {formik.touched.title && formik.errors.title ?(<div style={{color:"red"}}>{formik.errors.title}</div>) : null}&nbsp;

                <Form.Control type="text" placeholder="Author" id="author" name="Books.author" onChange={formik.handleChange} value={formik.values.author} onBlur={formik.handleBlur}/>
                {formik.touched.author && formik.errors.author ?(<div style={{color:"red"}}>{formik.errors.author}</div>) : null}&nbsp;

                <Form.Control type="text" placeholder="ISBNnumber" id="ISBNnumber" name="Books.ISBNnumber" onChange={formik.handleChange} value={formik.values.ISBNnumber} onBlur={formik.handleBlur}/>
                {formik.touched.ISBNnumber && formik.errors.ISBNnumber ?(<div style={{color:"red"}}>{formik.errors.ISBNnumber}</div>) : null}&nbsp;

                <Form.Control type="date" placeholder="publicationDate" id="publicationDate" name="Books.publicationDate" onChange={formik.handleChange} value={formik.values.publicationDate} onBlur={formik.handleBlur}/>
                {formik.touched.publicationDate && formik.errors.publicationDate ?(<div style={{color:"red"}}>{formik.errors.publicationDate}</div>) : null}&nbsp;

              </Form.Group>



              <Form.Group className="mb-3" >
                <Form.Label>Author</Form.Label>

                <Form.Control type="text" placeholder="authorsname" id="authorsname" name="Author.authorsname" onChange={formik.handleChange} value={formik.values.authorsname} onBlur={formik.handleBlur}/>
                {formik.touched.authorsname&& formik.errors.authorsname ?(<div style={{color:"red"}}>{formik.errors.authorsname}</div>) : null}&nbsp;

                <Form.Control type="date" placeholder="birthdate" id="birthdate" name="Author.birthdate" onChange={formik.handleChange} value={formik.values.birthdate} onBlur={formik.handleBlur}/>
                {formik.touched.birthdate&& formik.errors.birthdate ?(<div style={{color:"red"}}>{formik.errors.birthdate}</div>) : null}&nbsp;

                <Form.Control type="text" placeholder="shortbio" id="shortbio" name="Author.shortbio" onChange={formik.handleChange} value={formik.values.shortbio} onBlur={formik.handleBlur}/>
                {formik.touched.shortbio && formik.errors.shortbio?(<div style={{color:"red"}}>{formik.errors.shortbio}</div>) : null}&nbsp;

              </Form.Group>
    
              
              
              <Button variant="success" type='submit' style={{alignItems:"center"}}>Submit</Button>

          </Form>

         </div>
        </div>
      </div>
    }
    
    export default Edituser