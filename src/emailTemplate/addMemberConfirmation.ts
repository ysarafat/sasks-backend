import { TMembers } from '../modules/members/members.interface';

/* eslint-disable no-unused-expressions */
export const addMemberConfirmation = (data: TMembers) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Dancing+Script&family=Poppins:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet"
    />
    <title>Member add confirmation</title>
    <style>
      body {
        font-family: "Poppins", sans-serif !important;
        margin: 10px;
        padding: 0;
        box-sizing: border-box;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background: linear-gradient(
          0deg,
          rgba(241, 245, 249, 1) 0%,
          rgba(103, 232, 249, 0.479) 100%
        );
        padding: 8px 15px;
        border-radius: 10px;
        text-align: center;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
        margin-top: 25px;
      }

      th,
      td {
        border: 1px solid #cac5c5;
        padding: 8px;
        text-align: left;
      }

      th {
        background-color: #f1f5f9;
        font-weight: 500;
      }
      td {
        background-color: #f8fafc;
        font-weight: 400;
      }
      button {
        margin-bottom: 20px;
        padding: 5px 10px;
        border: none;
        outline: none;
        background: #188686;
        color: white;
        border-radius: 5px;
        font-weight: 500;
        font-size: 18px;
      }
    </style>
  </head>
  <body>
    <section class="container">
      <h1
        style="
          font-size: 22px;
          text-align: center;
          color: #188686;
          margin-bottom: 8px;
        "
      >
        Samiridho Agamir Aomaj Kollan Songstha
      </h1>
      <p style="text-align: center">
        Your member profile is published on
        <a
          href="https://sasks.org/"
          target="_blank"
          style="font-size: bold; color: #188686; text-decoration: none"
          >sasks.org</a
        >
      </p>
      <div style="border-bottom: 1px solid rgb(131, 124, 124)"></div>
      <p style="text-align: center">Your profile information:</p>
      <div style="height: 150px; width: 150px; margin: 0 auto">
        <img
          src=${data?.image}
          alt="image"
          style="
            height: 150px;
            width: 150px;
            margin: 0 auto;
            border-radius: 50%;
            border: 4px solid #188686;
          "
        />
      </div>
      <table>
        <tr>
          <th>Name</th>
          <td>${
            data?.name?.firstName +
            ' ' +
            data?.name?.middleName +
            ' ' +
            data?.name?.lastName
          }</td>
        </tr>
        <tr>
          <th>Contact Number</th>
          <td>${data?.contactNo}</td>
        </tr>
        <tr>
          <th>Email Address</th>
          <td>${data?.email}</td>
        </tr>
        <tr>
          <th>Date of Birth</th>
          <td>${data?.dateOfBirth}</td>
        </tr>
        <tr>
          <th>Blood Group</th>
          <td>${data?.bloodGroup}</td>
        </tr>
        <tr>
          <th>Organizational Designation</th>
          <td>${data?.designation}</td>
        </tr>
        <tr>
          <th>Religion</th>
          <td>${data?.religion}</td>
        </tr>
        <tr>
          <th>Educational Degree</th>
          <td>${data?.degree}</td>
        </tr>
        <tr>
          <th>Institution</th>
          <td>${data?.institution}</td>
        </tr>
        <tr>
          <th>Father Name</th>
          <td>${data?.fatherName}</td>
        </tr>
        <tr>
          <th>Mother Name</th>
          <td>${data?.motherName}</td>
        </tr>
        <tr>
          <th>Permanent Address</th>
          <td>
            Village/Road: ${data?.permanentAddress?.village}, Union: ${data
              ?.permanentAddress?.union}, Upazila: ${data?.permanentAddress
              ?.upazila},
            District: ${data?.permanentAddress?.district}, Division: ${data
              ?.permanentAddress?.division}, Post Code: ${data?.permanentAddress
              ?.postCode}
          </td>
        </tr>
        <tr>
          <th>Present Address</th>
          <td>
          Village/Road: ${data?.presentAddress?.village}, Union: ${data
            ?.presentAddress?.union}, Upazila: ${data?.presentAddress?.upazila},
          District: ${data?.presentAddress?.district}, Division: ${data
            ?.presentAddress?.division}, Post Code: ${data?.presentAddress
            ?.postCode}
          </td>
        </tr>
      </table>
      <a href="https://sasks.org/members" target="_blank">
        <button>View Profile</button></a
      >

      <div style="border-bottom: 1px solid rgb(131, 124, 124)"></div>
      <div>
        <p>
          Note: If any information is missing or incorrect in your profile
          information, please email us your correct information. Email:
          <span
            ><a
              href="mailto:admin@sasks.org"
              style="color: #188686; text-decoration: none"
              >admin@sasks.org</a
            ></span
          >
        </p>
      </div>
      <footer style="margin-top: 20px">
        <a
          href="https://sasks.org"
          target="_blank"
          style="
            color: #188686;
            font-size: 22px;
            text-decoration: none;
            margin: 0;
          "
          >Team SASKS</a
        >

        <p style="font-family: 'Dancing Script', cursive">our tag line</p>
        <div
          style="
            border-bottom: 4px solid rgb(131, 124, 124);
            width: 50%;
            margin: 0 auto;
            border-radius: 10px;
          "
        ></div>
        <div style="margin: 20px 0">
          <img
            src="https://res.cloudinary.com/db8ei7i7y/image/upload/v1703150108/web-assets-don%27t-change/icons8-facebook-96_e9motr.png"
            alt=""
            style="width: 35px; height: 35px"
          />
          <img
            src="https://res.cloudinary.com/db8ei7i7y/image/upload/v1703150108/web-assets-don%27t-change/icons8-telegram-96_pqtyoo.png"
            alt=""
            style="width: 35px; height: 35px"
          />
          <img
            src="https://res.cloudinary.com/db8ei7i7y/image/upload/v1703150108/web-assets-don%27t-change/icons8-instagram-96_wjvyxh.png"
            alt=""
            style="width: 35px; height: 35px"
          />
          <img
            src="https://res.cloudinary.com/db8ei7i7y/image/upload/v1703150108/web-assets-don%27t-change/icons8-youtube-96_reuhen.png"
            alt=""
            style="width: 35px; height: 35px"
          />
        </div>
      </footer>
    </section>
  </body>
</html>

`;
};
