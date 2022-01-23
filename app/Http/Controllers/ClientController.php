<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientController extends Controller
{
    private  $filePath =  '';

    public function __construct()
    {
        $this->filePath =public_path('csv/').'client.csv';
    }

    public function readFile($readable = false)
    {
        $data = array();
        if (file_exists($this->filePath)) {
            $file = fopen($this->filePath, 'r');
            if ($readable) {
            $headers = fgetcsv($file);
            }
            $i = 1;
            while (($row = fgetcsv($file, 200, ",")) !== FALSE) {
                if ($readable) {
                    $item['id'] = $i;
                    foreach ($row as $key => $value)
                        $item[$headers[$key]] = $value ?: null;
                    $data[] = $item;
                    $i++;
                } else {
                    $data[] = $row;
                }
            }
            fclose($file);
        }
        return $data;
    }


    public function getlist()
    {
        return response()->json(['data'=>$this->readFile(true)], 200);
    }


    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required|numeric',
        ]);
        $name = $request->name;
        $gender = $request->gender;
        $phone = $request->phone;
        $email = $request->email;
        $nationality = $request->nationality;
        $address = $request->address;
        $education = $request->education;
        $dob = $request->dob;
        $mode_of_contact = $request->mode_of_contact;
        $old_data = $this->readFile();
       
        $file = fopen($this->filePath, 'a+');
        
        if(count($old_data) ==0 ){
        $columns = array(
            'name',
            'gender',
            'phone',
            'email',
            'address',
            'nationality',
            'dob',
            'education',
            'mode_of_contact'
        );

        fputcsv($file, $columns);
    }
        $new_data = [
            'name' => $name,
            'gender' => $gender,
            'phone' => $phone,
            'email' => $email,
            'address' => $address,
            'nationality' => $nationality,
            'dob' => $dob,
            'education' => $education,
            'mode_of_contact' => $mode_of_contact,
        ];
        

        fputcsv($file, $new_data);

        fclose($file);
       
        return response()->json(['message' => 'Data saved'], 200);
    }
}
